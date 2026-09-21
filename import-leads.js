const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function importData() {
  try {
    const leadsData = JSON.parse(fs.readFileSync('/tmp/mlm-leads-backup.json', 'utf8'));
    
    console.log(`Importing ${leadsData.length} leads...`);
    
    for (const lead of leadsData) {
      const { simulatorResults, ...leadData } = lead;
      
      // Import lead
      await prisma.lead.create({
        data: {
          ...leadData,
          createdAt: new Date(leadData.createdAt)
        }
      });
      
      // Import simulator results if any
      for (const result of simulatorResults) {
        await prisma.simulatorResult.create({
          data: {
            ...result,
            leadId: lead.id,
            createdAt: new Date(result.createdAt),
            updatedAt: new Date(result.updatedAt),
            completedAt: result.completedAt ? new Date(result.completedAt) : null
          }
        });
      }
    }
    
    console.log('✅ Import complete!');
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Import error:', error.message);
    process.exit(1);
  }
}

importData();
