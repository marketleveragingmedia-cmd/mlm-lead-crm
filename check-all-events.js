const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.skoolEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 15
  });
  
  console.log(`\n📊 Total events in database: ${events.length}\n`);
  
  events.forEach((event, i) => {
    console.log(`${i + 1}. Event: ${event.eventType}`);
    console.log(`   Email: ${event.skoolEmail || 'N/A'}`);
    console.log(`   Member ID: ${event.skoolMemberId || 'N/A'}`);
    console.log(`   Created: ${event.createdAt.toISOString()}`);
    console.log('');
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
