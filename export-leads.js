const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://neondb_owner:npg_Z2fY4VFJpyKM@ep-square-mountain-appxory3.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

async function exportData() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        simulatorResults: true
      }
    });
    
    console.log(JSON.stringify(leads, null, 2));
    await prisma.$disconnect();
  } catch (error) {
    console.error('Export error:', error);
    process.exit(1);
  }
}

exportData();
