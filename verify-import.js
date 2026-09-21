const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  const count = await prisma.lead.count();
  const simulatorCount = await prisma.simulatorResult.count();
  console.log(`✅ Leads: ${count}`);
  console.log(`✅ Simulator Results: ${simulatorCount}`);
  await prisma.$disconnect();
}

verify();
