// Simulate Vercel environment
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_Jo9GdDlavmC3@ep-summer-wave-b4d9vh2b-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connection_limit=1";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Testing with pgbouncer connection...');
    const count = await prisma.lead.count();
    console.log('✅ Lead count:', count);
    
    const stats = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);
    console.log('✅ Stats query successful:', stats);
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Code:', error.code);
    await prisma.$disconnect();
    process.exit(1);
  }
}

test();
