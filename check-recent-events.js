const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const events = await prisma.skoolEvent.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 10 * 60 * 1000) // Last 10 minutes
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log(`Events in last 10 minutes: ${events.length}\n`);
  
  if (events.length === 0) {
    console.log('❌ No recent events - Skooly test buttons may not have sent webhooks');
  } else {
    events.forEach((e, i) => {
      console.log(`Event ${i + 1}:`);
      console.log(`  Type: ${e.eventType}`);
      console.log(`  Time: ${e.createdAt.toISOString()}`);
      console.log(`  Email: ${e.skoolEmail || 'none'}`);
      console.log(`  Payload: ${JSON.stringify(e.rawPayload).substring(0, 100)}...`);
      console.log('');
    });
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
