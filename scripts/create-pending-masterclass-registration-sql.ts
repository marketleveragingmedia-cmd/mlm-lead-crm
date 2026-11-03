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
  const existing = await prisma.$queryRaw`
    SELECT * FROM "WebinarRegistration"
    WHERE "leadId" = ${lead.id}
    AND "webinarEventId" = ${event.id}
    LIMIT 1
  `;

  if (Array.isArray(existing) && existing.length > 0) {
    const reg = existing[0] as any;
    console.log('⚠️  Registration already exists:');
    console.log(`   Status: ${reg.status}`);
    console.log(`   Qualified: ${reg.webinarEligible ? 'YES' : 'NO'}`);
    console.log(`   WebinarJam ID: ${reg.webinarJamRegistrantId || 'N/A'}`);
    
    // Delete it
    await prisma.$executeRaw`
      DELETE FROM "WebinarRegistration"
      WHERE "id" = ${reg.id}
    `;
    console.log('✅ Deleted existing registration for fresh test');
  }

  // Create pending registration via raw SQL
  const regId = randomUUID();
  const now = new Date();
  
  await prisma.$executeRaw`
    INSERT INTO "WebinarRegistration" (
      "id",
      "leadId",
      "webinarEventId",
      "source",
      "qualificationMethod",
      "status",
      "registrationStatus",
      "webinarEligible",
      "qualified",
      "registrationAttempts",
      "createdAt",
      "updatedAt"
    ) VALUES (
      ${regId},
      ${lead.id},
      ${event.id},
      'manual_test',
      'skool_premium',
      'pending',
      'pending',
      false,
      false,
      0,
      ${now},
      ${now}
    )
  `;

  console.log('\n✅ PENDING REGISTRATION CREATED');
  console.log(`   Registration ID: ${regId}`);
  console.log(`   Lead: ${lead.email}`);
  console.log(`   Event: ${event.name}`);
  console.log(`   Status: PENDING (awaiting qualification)`);
  console.log(`   Qualification Method: skool_premium`);
  
  console.log('\n📋 READY FOR TEST');
  console.log('The system is now ready to test Foundation Experience qualification.');
  console.log('When VIP tier is assigned, the webhook should qualify this pending registration.');

  await prisma.$disconnect();
}

createPendingRegistration();
