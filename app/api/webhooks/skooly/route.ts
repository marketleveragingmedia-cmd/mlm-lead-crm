import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import crypto from 'crypto';
import { getSkoolySecret } from '@/lib/skooly-secrets';
import { qualifyPendingWebinarRegistrations } from '@/lib/webinar-qualification';
import { sendEmail, addContactToAudience, AUDIENCE_MAP } from '@/lib/resend-crm';
import { getSkoolWelcomeEmail } from '@/lib/skool-welcome-templates';

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
    
    let leadId: string;
    
    if (lead) {
      console.log('✅ Found existing lead:', lead.id);
      
      // Update existing lead with Skool data
      const updatedLead = await updateLeadWithSkoolData(
        lead.id,
        skoolMemberId,
        pricingTier,
        firstName,
        lastName
      );
      
      leadId = updatedLead.id;
      
      // Store event
      await storeSkoolEvent(leadId, payload, eventType, skoolMemberId, normalizedEmail, pricingTier);
      
      console.log('✅ Updated existing lead');
      
      // Check if Premium qualification enables pending webinar registrations
      const isPremium = pricingTier.toLowerCase().includes('premium');
      await qualifyPendingWebinarRegistrations(leadId, isPremium);
      
    } else {
      console.log('🆕 Creating new lead (Direct Skool Signup)');
      
      // Auto-create lead for Skool member
      const newLead = await createLeadFromSkoolMember(
        firstName,
        lastName,
        normalizedEmail,
        skoolMemberId,
        pricingTier
      );
      
      leadId = newLead.id;
      
      // Store event
      await storeSkoolEvent(leadId, payload, eventType, skoolMemberId, normalizedEmail, pricingTier);
      
      console.log('✅ Created new lead:', leadId);
      
      // Send welcome email to direct Skool signups
      await sendWelcomeEmail(newLead, pricingTier);
      
      // Check if Premium qualification enables pending webinar registrations
      const isPremium = pricingTier.toLowerCase().includes('premium');
      await qualifyPendingWebinarRegistrations(leadId, isPremium);
    }
    
    // Sync to Global Control (async, don't block webhook response)
    syncToGlobalControl(leadId, pricingTier).catch(err => {
      console.error('⚠️  Global Control sync failed (non-blocking):', err.message);
    });
    
    // Sync to Resend (async, don't block webhook response)
    syncToResend(leadId, normalizedEmail, firstName, lastName, pricingTier).catch(err => {
      console.error('⚠️  Resend sync failed (non-blocking):', err.message);
    });
    
    return NextResponse.json({ 
      ok: true, 
      leadId: leadId,
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
  try {
    // Check if welcome email already sent (idempotency)
    if (lead.skoolWelcomeEmailSent) {
      console.log(`⏭️  Welcome email already sent to ${lead.email} - skipping`);
      return;
    }
    
    const tier = pricingTier.toLowerCase().includes('premium') ? 'Premium' : 'Standard';
    const { subject, html } = getSkoolWelcomeEmail({
      tier,
      firstName: lead.firstName,
      email: lead.email,
      fromDomain: 'm.networkleveragingcashflow.com'
    });
    
    console.log(`📧 Sending ${tier} welcome email to ${lead.email}...`);
    
    // Send via Resend
    const result = await sendEmail({
      from: 'Samantha Hill | MzSamantha <notifications@m.networkleveragingcashflow.com>',
      to: lead.email,
      subject,
      html,
      replyTo: 'samantha@networkleveragingcashflow.com',
      tags: [
        { name: 'type', value: 'skool-welcome' },
        { name: 'tier', value: tier.toLowerCase() },
        { name: 'source', value: 'skool-webhook' }
      ]
    });
    
    console.log(`✅ Welcome email sent successfully:`, result.id);
    
    // Mark as sent in database (idempotency control)
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        skoolWelcomeEmailSent: true,
        skoolWelcomeEmailSentAt: new Date()
      }
    });
    
    console.log(`✅ Welcome email flag set for lead ${lead.id}`);
    
  } catch (error: any) {
    console.error(`❌ Error sending welcome email to ${lead.email}:`, error.message);
    // Don't throw - log error but don't fail webhook
    // Store error for manual review if needed
  }
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
  try {
    const isPremium = pricingTier.toLowerCase().includes('premium');
    const tier = isPremium ? 'Premium' : 'Standard';
    
    console.log(`📮 Syncing ${tier} member ${email} to Resend audiences...`);
    
    // Get appropriate audience IDs
    const mainAudienceId = AUDIENCE_MAP['skool-community']; // Main NLC list
    const tierAudienceId = isPremium ? AUDIENCE_MAP['skool-premium'] : AUDIENCE_MAP['skool-standard'];
    
    const results = [];
    
    // Add to main NLC community audience
    try {
      const contactId = await addContactToAudience(
        email,
        firstName,
        lastName,
        mainAudienceId,
        false // not unsubscribed
      );
      results.push({ audience: 'main-nlc', success: true, contactId });
      console.log(`✅ Added to main NLC audience: ${contactId}`);
    } catch (error: any) {
      // If contact already exists in audience, that's okay
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        results.push({ audience: 'main-nlc', success: true, note: 'already-exists' });
        console.log(`✅ Already in main NLC audience (duplicate ignored)`);
      } else {
        results.push({ audience: 'main-nlc', success: false, error: error.message });
        console.error(`❌ Failed to add to main NLC audience:`, error.message);
      }
    }
    
    // Add to tier-specific audience
    try {
      const contactId = await addContactToAudience(
        email,
        firstName,
        lastName,
        tierAudienceId,
        false
      );
      results.push({ audience: tier.toLowerCase(), success: true, contactId });
      console.log(`✅ Added to ${tier} audience: ${contactId}`);
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
        results.push({ audience: tier.toLowerCase(), success: true, note: 'already-exists' });
        console.log(`✅ Already in ${tier} audience (duplicate ignored)`);
      } else {
        results.push({ audience: tier.toLowerCase(), success: false, error: error.message });
        console.error(`❌ Failed to add to ${tier} audience:`, error.message);
      }
    }
    
    // Update lead with Resend contact info (if we got a new contact ID)
    const successfulContact = results.find(r => r.contactId);
    if (successfulContact?.contactId) {
      await prisma.lead.update({
        where: { id: leadId },
        data: {
          resendContactId: successfulContact.contactId,
          resendAudienceId: tierAudienceId
        }
      });
      console.log(`✅ Updated lead ${leadId} with Resend contact ID`);
    }
    
    console.log(`✅ Resend sync complete for ${email}:`, results);
    
  } catch (error: any) {
    console.error(`❌ Error syncing ${email} to Resend:`, error.message);
    // Don't throw - log error but don't fail webhook
  }
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
      'Welcome emails (ACTIVE - Standard/Premium variants)',
      'Resend audience sync (ACTIVE)',
      'Idempotency controls (prevents duplicate emails)',
      'Global Control sync (DEFERRED)'
    ]
  });
}
