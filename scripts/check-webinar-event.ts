import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkWebinarEvent() {
  console.log('=== WEBINAR EVENT CHECK ===\n');
  
  const events = await prisma.webinarEvent.findMany({
    where: {
      OR: [
        { webinarId: 'CFI-2026-11-19' },
        { name: { contains: 'Cash Flow Injection' } }
      ]
    }
  });

  if (events.length === 0) {
    console.log('❌ NO MASTERCLASS EVENT FOUND');
    console.log('   The WebinarEvent record needs to be created first');
  } else {
    events.forEach(event => {
      console.log('Event Found:');
      console.log(`  ID: ${event.id}`);
      console.log(`  Name: ${event.name}`);
      console.log(`  Webinar ID: ${event.webinarId}`);
      console.log(`  Qualification Method: ${event.qualificationMethod}`);
      console.log(`  Active: ${event.active}`);
      console.log(`  Created: ${event.createdAt}`);
    });
  }

  await prisma.$disconnect();
}

checkWebinarEvent();
