const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const event = await prisma.skoolEvent.findFirst({
    where: { eventType: 'new_member' },
    orderBy: { createdAt: 'desc' }
  });
  
  if (event) {
    console.log('📧 Email:', event.skoolEmail);
    console.log('🆔 Member ID:', event.skoolMemberId);
    console.log('📋 Event Type:', event.eventType);
    console.log('✅ Processed:', event.processed);
    console.log('🔗 Matched Lead ID:', event.leadId || 'NO MATCH');
    console.log('\n📦 Raw Payload:');
    console.log(JSON.stringify(event.rawPayload, null, 2));
  } else {
    console.log('❌ No new_member event found');
  }
  
  await prisma.$disconnect();
}

check().catch(console.error);
