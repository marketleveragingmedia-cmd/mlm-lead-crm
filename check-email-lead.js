const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const lead = await prisma.lead.findUnique({
    where: { email: 'drifllc.marketing+tester123@gmail.com' }
  });
  
  if (lead) {
    console.log('✅ Lead EXISTS in NLC Lead CRM');
    console.log('ID:', lead.id);
    console.log('Name:', lead.firstName, lead.lastName);
    console.log('Source:', lead.sourcePage);
    console.log('Skool Plan:', lead.skoolPlan || 'NOT SET');
    console.log('Skool Member ID:', lead.skoolMemberId || 'NOT SET');
  } else {
    console.log('❌ Lead does NOT exist in NLC Lead CRM');
    console.log('The webhook will still capture the event, but won\'t match to a lead');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
