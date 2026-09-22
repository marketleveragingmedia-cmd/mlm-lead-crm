const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const events = await prisma.skoolEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  console.log(`Total Skool events received: ${events.length}`);
  
  if (events.length === 0) {
    console.log('\n❌ No events received yet');
    console.log('\nPossible issues:');
    console.log('1. Webhook URL not saved in Skooly settings');
    console.log('2. No test membership created yet');
    console.log('3. Skooly webhook not triggered');
  } else {
    console.log('\n✅ Events received:');
    events.forEach(e => {
      console.log(`- ${e.eventType} at ${e.createdAt} (lead: ${e.leadId ? 'matched' : 'NO MATCH'})`);
    });
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
