const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n🔄 Updating existing lead sources...\n');
  
  // Update leads created via simulator
  const simulatorLeads = await prisma.lead.updateMany({
    where: {
      sourcePage: {
        contains: 'cash-flow-injection-simulator'
      },
      source: 'Unknown'
    },
    data: {
      source: 'Cash Flow Simulator'
    }
  });
  
  console.log(`✅ Updated ${simulatorLeads.count} simulator leads`);
  
  // Update leads with cashflowvisionaries.com domain
  const cfvLeads = await prisma.lead.updateMany({
    where: {
      sourcePage: {
        contains: 'cashflowvisionaries'
      },
      source: 'Unknown'
    },
    data: {
      source: 'Cashflow Visionaries Landing'
    }
  });
  
  console.log(`✅ Updated ${cfvLeads.count} CFV landing leads`);
  
  // Update any remaining "Unknown" to a default
  const unknownLeads = await prisma.lead.updateMany({
    where: {
      source: 'Unknown'
    },
    data: {
      source: 'Legacy Import'
    }
  });
  
  console.log(`✅ Updated ${unknownLeads.count} legacy leads`);
  
  console.log('\n📊 Final source distribution:\n');
  
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
