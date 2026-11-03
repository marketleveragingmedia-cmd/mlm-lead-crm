import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function create() {
  const lead = await prisma.lead.findUnique({
    where: { email: 'marketleveragingcontent@gmail.com' }
  });

  const event = await prisma.webinarEvent.findFirst({
    where: { webinarId: 'CFI-2026-11-19' }
  });

  if (!lead || !event) {
    console.log('❌ Missing lead or event');
    await prisma.$disconnect();
    return;
  }

  // Delete any existing
  await prisma.$executeRaw`
    DELETE FROM "WebinarRegistration"
    WHERE "leadId" = ${lead.id}
    AND "webinarEventId" = ${event.id}
  `;

  // Insert minimal version
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
      0,
      ${now},
      ${now}
    )
  `;

  console.log('✅ Created pending registration');
  console.log(`   ID: ${regId}`);
  console.log(`   Lead: ${lead.email}`);
  console.log(`   Event: ${event.name}`);

  await prisma.$disconnect();
}

create();
