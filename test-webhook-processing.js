const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n🧪 Testing webhook processing logic...\n');
  
  // Get unprocessed Skool events
  const events = await prisma.skoolEvent.findMany({
    where: {
      createdAt: {
        gte: new Date('2026-09-22T20:00:00.000Z')
      }
    },
    orderBy: { createdAt: 'asc' }
  });
  
  console.log(`Found ${events.length} recent events\n`);
  
  for (const event of events) {
    console.log(`📧 Processing: ${event.eventType} - ${event.skoolEmail}`);
    
    if (!event.skoolEmail) {
      console.log('   ⚠️  No email, skipping\n');
      continue;
    }
    
    // Check if lead exists
    const lead = await prisma.lead.findUnique({
      where: { email: event.skoolEmail.toLowerCase() }
    });
    
    if (lead) {
      console.log(`   ✅ Lead exists: ${lead.firstName} ${lead.lastName}`);
      console.log(`      Source: ${lead.source}`);
      console.log(`      Skool Plan: ${lead.skoolPlan || 'Not set'}`);
    } else {
      console.log(`   🆕 Would create new lead (Direct Skool Signup)`);
      
      // Parse name from raw payload
      const memberName = event.rawPayload?.member?.name || '';
      console.log(`      Name from webhook: "${memberName}"`);
      
      if (memberName) {
        const parts = memberName.trim().split(/\s+/);
        const firstName = parts[0] || 'Skool';
        const lastName = parts.slice(1).join(' ') || 'Member';
        console.log(`      Would set: ${firstName} ${lastName}`);
      }
    }
    console.log('');
  }
  
  // Show current lead sources
  console.log('📊 Current lead sources:\n');
  
  const leadsBySource = await prisma.lead.groupBy({
    by: ['source'],
    _count: true
  });
  
  leadsBySource.forEach(({ source, _count }) => {
    console.log(`   ${source}: ${_count}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
