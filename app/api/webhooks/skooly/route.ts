import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Skooly Webhook Endpoint
 * 
 * Purpose: Capture ALL webhook payloads during 7-day trial to document actual event structure
 * 
 * This endpoint:
 * 1. Logs COMPLETE webhook payload (for documentation)
 * 2. Stores raw event in SkoolEvent table
 * 3. Attempts email matching to existing Lead
 * 4. Processes known events (once we know the structure)
 * 
 * DO NOT assume event names or payload structure - capture first, implement later
 */

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  try {
    // Parse webhook payload
    const payload = await request.json();
    
    // Log COMPLETE payload for documentation
    console.log('========================================');
    console.log('🎓 SKOOLY WEBHOOK RECEIVED:', timestamp);
    console.log('========================================');
    console.log(JSON.stringify(payload, null, 2));
    console.log('========================================');
    
    // Extract common fields (guessing based on typical webhook patterns)
    // These may not exist - we'll find out during testing
    const eventType = payload.event || payload.type || payload.action || 'unknown';
    const memberEmail = payload.email || payload.member?.email || payload.user?.email || null;
    const memberId = payload.member_id || payload.memberId || payload.id || null;
    const membershipPlan = payload.plan || payload.membership?.plan || payload.tier || null;
    const membershipStatus = payload.status || payload.membership?.status || null;
    
    console.log('📋 Extracted fields (best guess):');
    console.log('  Event Type:', eventType);
    console.log('  Email:', memberEmail);
    console.log('  Member ID:', memberId);
    console.log('  Plan:', membershipPlan);
    console.log('  Status:', membershipStatus);
    
    // Try to match to existing lead by email (normalized)
    let matchedLead = null;
    if (memberEmail) {
      const normalizedEmail = String(memberEmail).toLowerCase().trim();
      matchedLead = await prisma.lead.findUnique({
        where: { email: normalizedEmail }
      });
      
      if (matchedLead) {
        console.log('✅ Matched to existing lead:', matchedLead.id, '-', matchedLead.firstName, matchedLead.lastName);
      } else {
        console.log('⚠️  No matching lead found for email:', normalizedEmail);
      }
    } else {
      console.log('⚠️  No email found in webhook payload - cannot match to lead');
    }
    
    // Store raw event in SkoolEvent table
    const skoolEvent = await prisma.skoolEvent.create({
      data: {
        leadId: matchedLead?.id || null,
        eventType: eventType,
        skoolMemberId: memberId ? String(memberId) : null,
        skoolEmail: memberEmail ? String(memberEmail).toLowerCase() : null,
        rawPayload: payload,
        membershipPlan: membershipPlan ? String(membershipPlan) : null,
        membershipStatus: membershipStatus ? String(membershipStatus) : null,
        processed: false
      }
    });
    
    console.log('💾 Event stored:', skoolEvent.id);
    
    // Process known events (placeholder - will implement after we know the structure)
    if (matchedLead && eventType) {
      try {
        await processSkoolEvent(matchedLead.id, eventType, membershipPlan, membershipStatus, memberId);
        
        // Mark as processed
        await prisma.skoolEvent.update({
          where: { id: skoolEvent.id },
          data: { 
            processed: true,
            processedAt: new Date()
          }
        });
        
        console.log('✅ Event processed successfully');
      } catch (processingError: any) {
        console.error('❌ Error processing event:', processingError.message);
        
        // Store error but don't fail webhook
        await prisma.skoolEvent.update({
          where: { id: skoolEvent.id },
          data: { 
            errorMessage: processingError.message
          }
        });
      }
    }
    
    // Always return 200 OK to acknowledge receipt
    return NextResponse.json({ 
      ok: true, 
      eventId: skoolEvent.id,
      message: 'Webhook received and logged'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ SKOOLY WEBHOOK ERROR:', error);
    console.error('Stack:', error.stack);
    
    // Return 200 anyway to prevent retries during testing phase
    return NextResponse.json({ 
      ok: false, 
      error: 'Internal error',
      message: 'Logged for review'
    }, { status: 200 });
  }
}

/**
 * Process Skool Event - Update Lead record based on membership changes
 * 
 * This will be implemented properly once we know the actual event structure
 */
async function processSkoolEvent(
  leadId: string, 
  eventType: string, 
  membershipPlan: string | null,
  membershipStatus: string | null,
  memberId: string | null
) {
  console.log('🔄 Processing event for lead:', leadId);
  
  // Update lead with Skool member ID if we have it
  if (memberId) {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        skoolMemberId: String(memberId)
      }
    });
  }
  
  // Check if this looks like a new membership event
  if (eventType.includes('member') || eventType.includes('join') || eventType.includes('created')) {
    console.log('  → Looks like new member event');
    
    if (membershipPlan) {
      const plan = String(membershipPlan).toLowerCase();
      
      // Standard membership ($0/month)
      if (plan.includes('standard') || plan.includes('free') || plan.includes('basic')) {
        console.log('  → Setting Standard membership');
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            skoolPlan: 'Standard',
            fullSimulatorResultsUnlocked: true,
            skoolMembershipStartedAt: new Date()
          }
        });
      }
      
      // Premium membership ($50/year)
      else if (plan.includes('premium') || plan.includes('vip') || plan.includes('paid')) {
        console.log('  → Setting Premium membership');
        await prisma.lead.update({
          where: { id: leadId },
          data: {
            skoolPlan: 'Premium',
            fullSimulatorResultsUnlocked: true,
            officialCashFlowVisionary: true,
            skoolMembershipStartedAt: new Date()
          }
        });
      }
    }
  }
  
  // Check if this looks like an upgrade event
  else if (eventType.includes('upgrade') || eventType.includes('premium')) {
    console.log('  → Looks like upgrade event');
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        skoolPlan: 'Premium',
        fullSimulatorResultsUnlocked: true,
        officialCashFlowVisionary: true
      }
    });
  }
  
  // Check if this looks like a cancellation
  else if (eventType.includes('cancel') || eventType.includes('inactive') || eventType.includes('removed')) {
    console.log('  → Looks like cancellation/removal event');
    // For now, just log - decide what to do with cancelled members later
    console.log('  ℹ️  Member cancelled/removed - no action taken yet');
  }
  
  console.log('✅ Event processing complete');
}

// Allow GET for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Skooly webhook endpoint active',
    endpoint: '/api/webhooks/skooly',
    method: 'POST',
    status: 'ready',
    note: 'Send POST requests with Skooly webhook payloads here'
  });
}
