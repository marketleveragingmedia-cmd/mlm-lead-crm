const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const results = await prisma.simulatorResult.findMany({
    where: { simulatorCompleted: true },
    include: { lead: { select: { firstName: true, email: true } } },
    orderBy: { completedAt: 'desc' },
    take: 5
  });
  
  console.log(`Total completed simulators: ${results.length}`);
  results.forEach(r => {
    console.log(`- ${r.lead.firstName} (${r.lead.email}) - ${r.completedAt}`);
  });
  
  await prisma.$disconnect();
}

check().catch(console.error);
