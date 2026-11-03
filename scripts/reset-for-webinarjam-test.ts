import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetForTest() {
  console.log('=== RESETTING TEST MEMBER FOR WEBINARJAM QUALIFICATION TEST ===\n');
  
  // Reset to Standard tier (preserves Foundation status for historical accuracy)
  await prisma.lead.update({
    where: { email: 'marketleveragingcontent@gmail.com' },
    data: {
      skoolPlan: 'Standard',
      // Keep Foundation Experience status (it was purchased, just resetting tier)
      // foundationExperiencePurchased: true (unchanged)
      // officialCashFlowVisionary: true (unchanged)
    },
  });

  console.log('✅ Test member reset to Standard tier');
  console.log('✅ Foundation Experience status preserved (purchased)');
  console.log('✅ Official CFV status preserved');
  console.log('\n📋 NEXT STEPS:');
  console.log('1. Wait 30 seconds for Vercel deployment to complete');
  console.log('2. Go to SKOOL Admin');
  console.log('3. Change marketleveragingcontent@gmail.com: Standard → VIP');
  console.log('4. Save');
  console.log('5. Wait 10 seconds');
  console.log('6. Tell me "Check WebinarJam"');
  console.log('\nThis will trigger the updated qualification logic with Foundation support.');

  await prisma.$disconnect();
}

resetForTest();
