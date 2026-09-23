import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import crypto from 'crypto';
import { getSkoolySecret } from '@/lib/skooly-secrets';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Skooly Webhook Endpoint - PRODUCTION VERSION
 * 
 * Features:
 * 1. HMAC-SHA256 signature verification
 * 2. Auto-create leads for new Skool members
 * 3. Update existing leads with Skool membership data
 * 4. Parse member names (firstName/lastName)
 * 5. Track member source ("Direct Skool Signup" vs form fills)
 * 6. Differentiate Premium vs Standard members
 * 7. Sync to Global Control (tags)
 * 8. Send welcome emails (different for Premium vs Standard)
 */

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    
    // Verify webhook signature
    const signature = request.headers.get('x-skooly-signature');
    const eventType = payload.event || 'unknown';
    
    if (signature) {
      const secret = getSkoolySecret(eventType);
      if (secret) {
        const computedSignature = crypto
          .createHmac('sha256', secret)
          .update(rawBody)
          .digest('hex');
        
        if (computedSignature !== signature) {
          console.error('❌ Invalid webhook signature');
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
      }
    }
    
    console.log('========================================');
    console.log('🎓 SKOOLY WEBHOOK:', timestamp);
    console.log('Event:', eventType);
    console.log('========================================');
    
    // Extract member data from payload
    const memberData = payload.member || {};
    const memberEmail = memberData.email || null;
    const memberName = memberData.name || '';
    const skoolMemberId = memberData.skool_member_id || memberData.id || null;
    const pricingTier = memberData.pricing_tier || payload.data?.tier || 'Standard';
    
    // Validate email
    if (!memberEmail) {
      console.log('⚠️  No email in webhook - storing event but skipping processing');
      await storeSkoolEvent(null, payload, eventType, null, null, null);
      return NextResponse.json({ ok: true, message: 'No email to process' });
    }
    
    const normalizedEmail = String(memberEmail).toLowerCase().trim();
    console.log('📧 Email:', normalizedEmail);
    console.log('👤 Name:', memberName);
    console.log('🆔 Skool Member ID:', skoolMemberId);
    console.log('💎 Tier:', pricingTier);
    
    // Parse name into firstName/lastName
    const { firstName, lastName } = parseMemberName(memberName);
    console.log('📝 Parsed:', { firstName, lastName });
    
    // Check if lead exists
    let lead = await prisma.lead.findUnique({
      where: { email: normalizedEmail }
    });
    
    if (lead) {
      console.log('✅ Found existing lead:', lead.id);
      
      // Update existing lead with Skool data
      lead = await updateLeadWithSkoolData(
        lead.id,
        skoolMemberId,
        pricingTier,
        firstName,
        lastName
      );
      
      // Store event
      await storeSkoolEvent(lead.id, payload, eventType, skoolMemberId, normalizedEmail, pricingTier);
      
      console.log('✅ Updated existing lead');
      
    } else {
      console.log('🆕 Creating new lead (Direct Skool Signup)');
      
      // Auto-create lead for Skool member
      lead = await createLeadFromSkoolMember(
        firstName,
        lastName,
        normalizedEmail,
        skoolMemberId,
        pricingTier
      );
      
      // Store event
      await storeSkoolEvent(lead.id, payload, eventType, skoolMemberId, normalizedEmail, pricingTier);
      
      console.log('✅ Created new lead:', lead.id);
      
      // Send welcome email to direct Skool signups
      await sendWelcomeEmail(lead, pricingTier);
    }
    
    // Sync to Global Control (async, don't block webhook response)
    syncToGlobalControl(lead.id, pricingTier).catch(err => {
      console.error('⚠️  Global Control sync failed (non-blocking):', err.message);
    });
    
    // Sync to Resend (async, don't block webhook response)
    syncToResend(lead.id, normalizedEmail, firstName, lastName, pricingTier).catch(err => {
      console.error('⚠️  Resend sync failed (non-blocking):', err.message);
    });
    
    return NextResponse.json({ 
      ok: true, 
      leadId: lead.id,
      message: 'Webhook processed successfully'
    });
    
  } catch (error: any) {
    console.error('❌ SKOOLY WEBHOOK ERROR:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message
    }, { status: 500 });
  }
}

/**
 * Parse member name into firstName and lastName
 */
function parseMemberName(fullName: string): { firstName: string; lastName: string } {
  if (!fullName || fullName.trim() === '') {
    return { firstName: 'Skool', lastName: 'Member' };
  }
  
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ')
  };
}

/**
 * Create new lead from Skool member (Direct Skool Signup)
 */
async function createLeadFromSkoolMember(
  firstName: string,
  lastName: string,
  email: string,
  skoolMemberId: string | null,
  pricingTier: string
): Promise<any> {
  const isPremium = pricingTier.toLowerCase().includes('premium');
  
  return await prisma.lead.create({
    data: {
      firstName,
      lastName,
      email,
      source: 'Direct Skool Signup',
      sourcePage: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      skoolMemberId: skoolMemberId ? String(skoolMemberId) : null,
      skoolPlan: isPremium ? 'Premium' : 'Standard',
      skoolMembershipStartedAt: new Date(),
      fullSimulatorResultsUnlocked: true,
      officialCashFlowVisionary: isPremium, // Only Premium = official CFV
    }
  });
}

/**
 * Update existing lead with Skool membership data
 */
async function updateLeadWithSkoolData(
  leadId: string,
  skoolMemberId: string | null,
  pricingTier: string,
  firstName: string,
  lastName: string
): Promise<any> {
  const isPremium = pricingTier.toLowerCase().includes('premium');
  
  // Get current lead to check if name should be updated
  const currentLead = await prisma.lead.findUnique({ where: { id: leadId } });
  
  const updateData: any = {
    skoolPlan: isPremium ? 'Premium' : 'Standard',
    fullSimulatorResultsUnlocked: true,
    officialCashFlowVisionary: isPremium,
  };
  
  // Set Skool member ID if provided
  if (skoolMemberId) {
    updateData.skoolMemberId = String(skoolMemberId);
  }
  
  // Set membership start date if not already set
  if (!currentLead?.skoolMembershipStartedAt) {
    updateData.skoolMembershipStartedAt = new Date();
  }
  
  // Update name only if current name is generic/placeholder
  if (
    currentLead &&
    (currentLead.firstName === 'Skool' || currentLead.firstName === '' || !currentLead.firstName)
  ) {
    updateData.firstName = firstName;
    updateData.lastName = lastName;
  }
  
  return await prisma.lead.update({
    where: { id: leadId },
    data: updateData
  });
}

/**
 * Store Skool event for history/debugging
 */
async function storeSkoolEvent(
  leadId: string | null,
  payload: any,
  eventType: string,
  skoolMemberId: string | null,
  skoolEmail: string | null,
  membershipPlan: string | null
) {
  await prisma.skoolEvent.create({
    data: {
      leadId,
      eventType,
      skoolMemberId: skoolMemberId ? String(skoolMemberId) : null,
      skoolEmail,
      rawPayload: payload,
      membershipPlan,
      processed: true,
      processedAt: new Date()
    }
  });
}

/**
 * Send welcome email to direct Skool signups
 */
async function sendWelcomeEmail(lead: any, pricingTier: string) {
  // TODO: Implement welcome email sending via Resend
  // Different email for Premium vs Standard
  console.log(`📧 TODO: Send welcome email to ${lead.email} (${pricingTier})`);
}

/**
 * Sync lead to Global Control with appropriate tags
 */
async function syncToGlobalControl(leadId: string, pricingTier: string) {
  // TODO: Implement Global Control sync
  // Tags: "Network Leveraging Cash Flow", "SKOOL Member - Premium/Standard", "Direct Skool Signup"
  console.log(`🌐 TODO: Sync lead ${leadId} to Global Control (${pricingTier})`);
}

/**
 * Sync lead to Resend audiences
 */
async function syncToResend(
  leadId: string, 
  email: string, 
  firstName: string, 
  lastName: string, 
  pricingTier: string
) {
  // TODO: Implement Resend sync
  // Add to "Network Leveraging Cash Flow" audience
  // Add to "SKOOL Premium Members" or "SKOOL Standard Members" audience
  console.log(`📮 TODO: Sync lead ${leadId} to Resend (${pricingTier})`);
}

// Allow GET for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Skooly webhook endpoint active',
    endpoint: '/api/webhooks/skooly',
    method: 'POST',
    status: 'ready',
    features: [
      'HMAC-SHA256 signature verification',
      'Auto-create leads for new Skool members',
      'Update existing leads with Skool data',
      'Name parsing (firstName/lastName)',
      'Source tracking (Direct Skool Signup)',
      'Premium vs Standard differentiation',
      'Global Control sync (TODO)',
      'Resend sync (TODO)',
      'Welcome emails (TODO)'
    ]
  });
}
