const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const count = await prisma.skoolEvent.count();
  console.log('Total events in database:', count);
  
  const recent = await prisma.skoolEvent.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  
  if (recent) {
    console.log('\nMost recent event:');
    console.log('  Type:', recent.eventType);
    console.log('  Time:', recent.createdAt.toISOString());
    console.log('  Age:', Math.round((Date.now() - recent.createdAt.getTime()) / 1000), 'seconds ago');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
