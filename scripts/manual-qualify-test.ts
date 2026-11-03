import { PrismaClient } from '@prisma/client';
import { qualifyPendingWebinarRegistrations } from '../lib/webinar-qualification';

const prisma = new PrismaClient();

async function manualQualify() {
  console.log('=== MANUAL QUALIFICATION TEST ===\n');
  
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' }
  });

  if (!lead) {
    console.log('❌ Lead not found');
    await prisma.$disconnect();
    return;
  }

  console.log('Test Member:');
  console.log(`  Email: ${lead.email}`);
  console.log(`  SKOOL Tier: ${lead.skoolPlan}`);
  console.log(`  Foundation Purchaser: ${lead.foundationExperiencePurchased ? 'YES' : 'NO'}`);
  console.log(`  Official CFV: ${lead.officialCashFlowVisionary ? 'YES' : 'NO'}`);

  // Check pending registrations BEFORE
  const beforeRegs = await prisma.webinarRegistration.findMany({
    where: { leadId: lead.id }
  });

  console.log(`\nPending Registrations BEFORE: ${beforeRegs.length}`);
  beforeRegs.forEach(reg => {
    console.log(`  - Status: ${reg.status}, Eligible: ${reg.webinarEligible}, WebinarJam ID: ${reg.webinarJamRegistrantId || 'N/A'}`);
  });

  // Trigger qualification
  console.log('\n🎯 Triggering qualification...');
  const isPremium = lead.skoolPlan === 'Premium';
  const isFoundationPurchaser = lead.foundationExperiencePurchased || false;
  
  console.log(`  isPremium: ${isPremium}`);
  console.log(`  isFoundationPurchaser: ${isFoundationPurchaser}`);

  await qualifyPendingWebinarRegistrations(lead.id, isPremium, isFoundationPurchaser);

  // Check registrations AFTER
  const afterRegs = await prisma.webinarRegistration.findMany({
    where: { leadId: lead.id }
  });

  console.log(`\nPending Registrations AFTER: ${afterRegs.length}`);
  afterRegs.forEach(reg => {
    console.log(`  - Status: ${reg.status}, Eligible: ${reg.webinarEligible}, WebinarJam ID: ${reg.webinarJamRegistrantId || 'N/A'}`);
  });

  console.log('\n=== TEST COMPLETE ===');

  await prisma.$disconnect();
}

manualQualify();
