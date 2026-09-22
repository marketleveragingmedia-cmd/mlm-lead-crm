const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const event = await prisma.skoolEvent.findFirst({
    where: { 
      eventType: 'member.joined',
      createdAt: {
        gte: new Date(Date.now() - 2 * 60 * 1000) // Last 2 minutes
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  if (event) {
    const payload = event.rawPayload;
    console.log('🎉 NEW MEMBER WEBHOOK RECEIVED!\n');
    console.log('Time:', event.createdAt.toISOString());
    console.log('Member Name:', payload.member?.name);
    console.log('Member Email:', payload.member?.email);
    console.log('Skool Member ID:', payload.member?.skool_member_id);
    console.log('Tier:', payload.member?.pricing_tier || payload.data?.tier);
    console.log('Test Event?:', payload.test || false);
    console.log('\nJoin Questions:');
    if (payload.data?.answers) {
      payload.data.answers.forEach(qa => {
        console.log(`  Q: ${qa.question}`);
        console.log(`  A: ${qa.answer}\n`);
      });
    }
    console.log('\nMatched to Lead?', event.leadId ? `YES (${event.leadId})` : 'NO');
  } else {
    console.log('❌ No member.joined event in last 2 minutes');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
