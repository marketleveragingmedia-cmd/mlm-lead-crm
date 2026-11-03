import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkWebhooks() {
  console.log('=== RECENT SKOOLY WEBHOOK EVENTS ===\n');
  
  const events = await prisma.skoolEvent.findMany({
    orderBy: { processedAt: 'desc' },
    take: 10
  });

  if (events.length === 0) {
    console.log('❌ No webhook events found in database');
  } else {
    console.log(`Found ${events.length} recent events:\n`);
    events.forEach((event, idx) => {
      const payload = event.rawPayload as any;
      console.log(`Event #${idx + 1}:`);
      console.log(`  Event Type: ${event.eventType}`);
      console.log(`  Email: ${event.skoolEmail}`);
      console.log(`  Plan: ${event.membershipPlan}`);
      console.log(`  Processed: ${event.processed ? 'YES' : 'NO'}`);
      console.log(`  Date: ${event.processedAt}`);
      console.log(`  SKOOL Member ID: ${event.skoolMemberId}`);
      if (payload?.error) {
        console.log(`  ⚠️  Error: ${payload.error}`);
      }
      console.log('');
    });
  }

  console.log('\n=== CURRENT WEBHOOK ENDPOINT ===');
  console.log('Expected URL: https://mlm-lead-crm.vercel.app/api/webhooks/skooly');
  console.log('\n⚠️  IMPORTANT: The GitHub repo name is "mlm-lead-crm"');
  console.log('   Even though the project is called "NLC Lead CRM",');
  console.log('   the webhook URL uses the repository name: mlm-lead-crm');

  await prisma.$disconnect();
}

checkWebhooks();
