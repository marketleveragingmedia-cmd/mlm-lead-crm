import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncStatus() {
  console.log('Syncing database to match SKOOL VIP status...');
  
  await prisma.lead.update({
    where: { email: 'marketleveragingcontent@gmail.com' },
    data: {
      skoolPlan: 'VIP',
      foundationExperiencePurchased: true,
      foundationExperiencePurchasedAt: new Date(),
      foundationExperienceSource: 'manual_vip_assignment',
      officialCashFlowVisionary: true,
    },
  });

  console.log('✅ Database synced to VIP with Foundation Experience granted');

  await prisma.$disconnect();
}

syncStatus();
