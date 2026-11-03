import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetTest() {
  console.log('Resetting test lead to Standard tier...');
  
  await prisma.lead.update({
    where: { email: 'marketleveragingcontent@gmail.com' },
    data: {
      skoolPlan: 'Standard',
      foundationExperiencePurchased: false,
      foundationExperiencePurchasedAt: null,
      foundationExperienceSource: null,
      foundationExperienceTransactionId: null,
    },
  });

  console.log('✅ Reset complete. Lead is now Standard tier.');
  console.log('\nNext steps:');
  console.log('1. Go to SKOOL Admin');
  console.log('2. Change marketleveragingcontent@gmail.com tier: Standard → VIP');
  console.log('3. Save');
  console.log('4. Tell me "Done"');

  await prisma.$disconnect();
}

resetTest();
