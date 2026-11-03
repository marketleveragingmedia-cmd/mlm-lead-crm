import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyWebinarJamRegistration() {
  console.log('=== WEBINARJAM INTEGRATION VERIFICATION ===\n');
  
  // 1. Get test member details
  console.log('1. TEST MEMBER STATUS:');
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      skoolPlan: true,
      foundationExperiencePurchased: true,
      foundationExperiencePurchasedAt: true,
      officialCashFlowVisionary: true,
    },
  });

  if (!lead) {
    console.log('❌ Test member not found');
    await prisma.$disconnect();
    return;
  }

  console.log(`   Email: ${lead.email}`);
  console.log(`   Name: ${lead.firstName} ${lead.lastName}`);
  console.log(`   SKOOL Tier: ${lead.skoolPlan}`);
  console.log(`   Foundation Participant: ${lead.foundationExperiencePurchased ? '✅ YES' : '❌ NO'}`);
  console.log(`   Official CFV: ${lead.officialCashFlowVisionary ? '✅ YES' : '❌ NO'}`);
  
  // 2. Check Foundation Experience eligibility
  console.log('\n2. FOUNDATION EXPERIENCE ELIGIBILITY:');
  const isEligible = lead.foundationExperiencePurchased || lead.skoolPlan === 'Premium';
  console.log(`   Eligible: ${isEligible ? '✅ YES' : '❌ NO'}`);
  console.log(`   Reason: ${lead.foundationExperiencePurchased ? 'Foundation Experience Purchaser' : lead.skoolPlan === 'Premium' ? 'Premium Member' : 'Not Eligible'}`);
  
  // 3. Check WebinarRegistration records
  console.log('\n3. WEBINAR REGISTRATION RECORDS:');
  const registrations = await prisma.webinarRegistration.findMany({
    where: { leadId: lead.id },
    orderBy: { createdAt: 'desc' },
  });

  if (registrations.length === 0) {
    console.log('   ❌ NO REGISTRATION RECORDS FOUND');
    console.log('   Issue: VIP assignment did not trigger WebinarJam registration');
  } else {
    console.log(`   Found ${registrations.length} registration(s):`);
    registrations.forEach((reg, idx) => {
      console.log(`\n   Registration #${idx + 1}:`);
      console.log(`   - Created: ${reg.createdAt}`);
      console.log(`   - Status: ${reg.status}`);
      console.log(`   - Source: ${reg.source || 'N/A'}`);
      console.log(`   - Webinar ID: ${reg.webinarId || 'N/A'}`);
      console.log(`   - WebinarJam ID: ${reg.webinarJamRegistrationId || 'N/A'}`);
      console.log(`   - Qualified: ${reg.qualified ? '✅ YES' : '❌ NO'}`);
      console.log(`   - Qualified At: ${reg.qualifiedAt || 'N/A'}`);
    });
  }
  
  // 4. Summary
  console.log('\n=== VERIFICATION SUMMARY ===');
  console.log(`Foundation Qualification: ${lead.foundationExperiencePurchased ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`Official CFV Status: ${lead.officialCashFlowVisionary ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`WebinarJam Registration: ${registrations.length > 0 ? 'PASS ✅' : 'FAIL ❌'}`);
  
  if (registrations.length === 0) {
    console.log('\n⚠️  ISSUE IDENTIFIED: Qualification logic did not trigger WebinarJam registration');
    console.log('   Possible causes:');
    console.log('   - No pending WebinarRegistration record existed');
    console.log('   - Qualification function was not called');
    console.log('   - WebinarJam API request failed');
  }

  await prisma.$disconnect();
}

verifyWebinarJamRegistration();
