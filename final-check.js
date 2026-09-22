const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const total = await prisma.skoolEvent.count();
  console.log('Total events:', total);
  
  if (total > 10) {
    console.log('\n✅ NEW EVENT(S) ARRIVED!\n');
    const newEvents = await prisma.skoolEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: total - 10
    });
    
    newEvents.forEach(e => {
      console.log('Type:', e.eventType);
      console.log('Time:', e.createdAt.toISOString());
      console.log('Member:', e.rawPayload.member?.name || 'N/A');
      console.log('Email:', e.rawPayload.member?.email || e.skoolEmail || 'N/A');
      console.log('');
    });
  } else {
    console.log('❌ Still no new events (member webhook delayed by Skooly)');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
