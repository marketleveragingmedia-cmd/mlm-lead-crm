import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkStatus() {
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' },
    select: {
      email: true,
      skoolPlan: true,
      foundationExperiencePurchased: true,
      foundationExperiencePurchasedAt: true,
      officialCashFlowVisionary: true,
    },
  });

  console.log('=== VIP WORKFLOW TEST RESULTS ===');
  console.log(JSON.stringify(lead, null, 2));
  
  if (lead?.foundationExperiencePurchased) {
    console.log('\n✅ SUCCESS: Foundation Experience was granted!');
    console.log(`✅ Granted at: ${lead.foundationExperiencePurchasedAt}`);
  } else {
    console.log('\n❌ FAILED: Foundation Experience was NOT granted');
  }
  
  if (lead?.officialCashFlowVisionary) {
    console.log('✅ SUCCESS: Official Cash Flow Visionary status granted!');
  } else {
    console.log('❌ FAILED: Official Cash Flow Visionary NOT granted');
  }

  await prisma.$disconnect();
}

checkStatus();
