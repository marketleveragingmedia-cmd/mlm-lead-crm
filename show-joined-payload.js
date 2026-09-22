const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const event = await prisma.skoolEvent.findFirst({
    where: { eventType: 'member.joined' },
    orderBy: { createdAt: 'desc' }
  });
  
  if (event) {
    console.log('📦 FULL member.joined PAYLOAD:');
    console.log(JSON.stringify(event.rawPayload, null, 2));
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
