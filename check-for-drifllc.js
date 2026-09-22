const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  // Check for any event with this email
  const events = await prisma.skoolEvent.findMany({
    where: {
      OR: [
        { skoolEmail: { contains: 'drifllc' } },
        { rawPayload: { path: ['member', 'email'], string_contains: 'drifllc' } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
  
  if (events.length > 0) {
    console.log(`✅ Found ${events.length} event(s) for drifllc email:\n`);
    events.forEach(e => {
      console.log('Event Type:', e.eventType);
      console.log('Time:', e.createdAt.toISOString());
      console.log('Email in payload:', e.rawPayload.member?.email);
      console.log('');
    });
  } else {
    console.log('❌ No events found for drifllc email yet');
    console.log('Webhook may be delayed by Skooly');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
