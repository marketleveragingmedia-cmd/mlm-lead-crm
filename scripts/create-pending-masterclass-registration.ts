import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function createPendingRegistration() {
  console.log('=== CREATING PENDING MASTERCLASS REGISTRATION ===\n');
  
  // Get test lead
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' }
  });

  if (!lead) {
    console.log('❌ Test lead not found');
    await prisma.$disconnect();
    return;
  }

  // Get November 19 Masterclass event
  const event = await prisma.webinarEvent.findFirst({
    where: { webinarId: 'CFI-2026-11-19' }
  });

  if (!event) {
    console.log('❌ November 19 Masterclass event not found');
    await prisma.$disconnect();
    return;
  }

  // Check if registration already exists
  const existing = await prisma.webinarRegistration.findFirst({
    where: {
      leadId: lead.id,
      webinarEventId: event.id
    }
  });

  if (existing) {
    console.log('⚠️  Registration already exists:');
    console.log(`   Status: ${existing.status}`);
    console.log(`   Qualified: ${existing.webinarEligible ? 'YES' : 'NO'}`);
    console.log(`   WebinarJam ID: ${existing.webinarJamRegistrantId || 'N/A'}`);
    
    // Delete it so we can start fresh
    await prisma.webinarRegistration.delete({
      where: { id: existing.id }
    });
    console.log('✅ Deleted existing registration for fresh test');
  }

  // Create pending registration
  const registration = await prisma.webinarRegistration.create({
    data: {
      id: randomUUID(),
      leadId: lead.id,
      webinarEventId: event.id,
      source: 'manual_test',
      qualificationMethod: 'skool_premium', // Foundation qualifies for this too now
      status: 'pending',
      registrationStatus: 'pending',
      webinarEligible: false,
      qualified: false,
      registrationAttempts: 0,
    }
  });

  console.log('\n✅ PENDING REGISTRATION CREATED');
  console.log(`   Registration ID: ${registration.id}`);
  console.log(`   Lead: ${lead.email}`);
  console.log(`   Event: ${event.name}`);
  console.log(`   Status: PENDING (awaiting qualification)`);
  console.log(`   Qualification Method: ${registration.qualificationMethod}`);
  
  console.log('\n📋 READY FOR TEST');
  console.log('Next step: Trigger VIP assignment to test qualification');

  await prisma.$disconnect();
}

createPendingRegistration();
