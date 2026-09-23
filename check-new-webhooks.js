const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.skoolEvent.findMany({
    where: {
      createdAt: {
        gte: new Date('2026-09-22T20:00:00.000Z')
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log(`\n📊 New webhooks received (after 20:00 UTC):\n`);
  console.log(`Total: ${events.length} events\n`);
  
  events.forEach((event, i) => {
    console.log(`${i + 1}. ${event.eventType}`);
    console.log(`   Member: ${event.skoolEmail || 'N/A'}`);
    console.log(`   Plan: ${event.membershipPlan || 'N/A'}`);
    console.log(`   Status: ${event.membershipStatus || 'N/A'}`);
    console.log(`   Processed: ${event.processed ? 'YES' : 'NO'}`);
    console.log(`   Created: ${event.createdAt.toISOString()}`);
    console.log('');
  });
  
  // Check if leads were created/updated
  const leadEmails = [...new Set(events.map(e => e.skoolEmail).filter(Boolean))];
  
  if (leadEmails.length > 0) {
    console.log(`\n🔍 Checking if leads exist for these emails:\n`);
    
    for (const email of leadEmails) {
      const lead = await prisma.lead.findUnique({
        where: { email: email.toLowerCase() }
      });
      
      if (lead) {
        console.log(`✅ ${email}`);
        console.log(`   Name: ${lead.firstName} ${lead.lastName}`);
        console.log(`   Skool Member ID: ${lead.skoolMemberId || 'Not set'}`);
        console.log(`   Skool Plan: ${lead.skoolPlan || 'Not set'}`);
      } else {
        console.log(`❌ ${email} - No lead found`);
      }
      console.log('');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
