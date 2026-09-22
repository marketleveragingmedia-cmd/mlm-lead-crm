const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const lead = await prisma.lead.findUnique({
    where: { email: 'my123vaassistant+simulator@gmail.com' }
  });
  
  if (lead) {
    console.log('✅ Lead EXISTS in NLC Lead CRM');
    console.log('ID:', lead.id);
    console.log('Name:', lead.firstName, lead.lastName);
    console.log('Skool Plan:', lead.skoolPlan || 'NOT SET');
    console.log('Skool Member ID:', lead.skoolMemberId || 'NOT SET');
  } else {
    console.log('❌ Lead NOT FOUND in NLC Lead CRM');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
