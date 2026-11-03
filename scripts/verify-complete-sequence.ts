import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySequence() {
  console.log('=== COMPLETE SEQUENCE VERIFICATION ===\n');
  
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' }
  });

  if (!lead) {
    console.log('❌ Lead not found');
    await prisma.$disconnect();
    return;
  }

  console.log('1. CURRENT CRM STATE:');
  console.log(`   Email: ${lead.email}`);
  console.log(`   SKOOL Plan: ${lead.skoolPlan}`);
  console.log(`   Foundation Experience Purchased: ${lead.foundationExperiencePurchased ? 'YES' : 'NO'}`);
  console.log(`   Foundation Purchased At: ${lead.foundationExperiencePurchasedAt || 'N/A'}`);
  console.log(`   Official Cash Flow Visionary: ${lead.officialCashFlowVisionary ? 'YES' : 'NO'}`);

  // Check webhook events
  const skoolEvents = await prisma.skoolEvent.findMany({
    where: {
      leadId: lead.id,
      eventType: 'member.tier_changed'
    },
    orderBy: { processedAt: 'desc' },
    take: 5
  });

  console.log('\n2. SKOOLY WEBHOOK EVENTS (Recent Tier Changes):');
  if (skoolEvents.length === 0) {
    console.log('   ⚠️  No tier_changed events found');
  } else {
    skoolEvents.forEach((event, idx) => {
      const payload = event.rawPayload as any;
      console.log(`   Event #${idx + 1}:`);
      console.log(`   - Date: ${event.processedAt}`);
      console.log(`   - Plan: ${event.membershipPlan}`);
      console.log(`   - Processed: ${event.processed ? 'YES' : 'NO'}`);
    });
  }

  // Check webinar registrations
  const registrations = await prisma.webinarRegistration.findMany({
    where: { leadId: lead.id },
    orderBy: { createdAt: 'desc' }
  });

  console.log('\n3. WEBINAR REGISTRATIONS:');
  if (registrations.length === 0) {
    console.log('   ❌ No registrations found');
  } else {
    registrations.forEach((reg, idx) => {
      console.log(`   Registration #${idx + 1}:`);
      console.log(`   - Created: ${reg.createdAt}`);
      console.log(`   - Status: ${reg.status}`);
      console.log(`   - Eligible: ${reg.webinarEligible ? 'YES' : 'NO'}`);
      console.log(`   - WebinarJam ID: ${reg.webinarJamRegistrantId || 'N/A'}`);
      console.log(`   - Source: ${reg.source}`);
    });
  }

  console.log('\n=== SEQUENCE ANALYSIS ===');
  
  // Determine the actual sequence
  const hasVIPPlan = lead.skoolPlan === 'VIP';
  const hasFoundation = lead.foundationExperiencePurchased;
  const hasOfficialCFV = lead.officialCashFlowVisionary;
  const hasWebinarReg = registrations.some(r => r.webinarJamRegistrantId !== null);
  const tierChangeEvents = skoolEvents.length > 0;

  console.log('\n✓ Checklist:');
  console.log(`   ${hasVIPPlan ? '✅' : '❌'} CRM shows VIP tier`);
  console.log(`   ${hasFoundation ? '✅' : '❌'} Foundation Experience Participant granted`);
  console.log(`   ${hasOfficialCFV ? '✅' : '❌'} Official Cash Flow Visionary granted`);
  console.log(`   ${hasWebinarReg ? '✅' : '❌'} WebinarJam registration completed`);
  console.log(`   ${tierChangeEvents ? '✅' : '❌'} Skooly tier_changed events recorded`);

  console.log('\n📝 CONCLUSION:');
  if (hasVIPPlan && hasFoundation && hasOfficialCFV && hasWebinarReg) {
    console.log('   ✅ COMPLETE AUTOMATED SEQUENCE VERIFIED');
    console.log('   All statuses granted correctly via VIP tier assignment');
  } else {
    console.log('   ⚠️  PARTIAL SEQUENCE - Manual intervention may have occurred');
  }

  await prisma.$disconnect();
}

verifySequence();
