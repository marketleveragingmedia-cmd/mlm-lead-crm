// Seed WebinarEvent records
import { PrismaClient } from '@prisma/client';
import { WEBINAR_EVENTS } from '../lib/webinar-config';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding webinar events...');

  for (const [key, config] of Object.entries(WEBINAR_EVENTS)) {
    const existing = await prisma.webinarEvent.findUnique({
      where: { webinarId: config.webinarId }
    });

    if (existing) {
      console.log(`✅ Webinar event already exists: ${config.webinarId}`);
      // Update if needed
      await prisma.webinarEvent.update({
        where: { webinarId: config.webinarId },
        data: {
          name: config.name,
          description: config.description,
          startDateTime: config.startDateTime,
          timezone: config.timezone,
          durationMinutes: config.durationMinutes,
          webinarJamWebinarId: config.webinarJamWebinarId,
          webinarJamScheduleId: config.webinarJamScheduleId,
          webinarJamHash: config.webinarJamHash,
          qualificationMethod: config.qualificationMethod,
          requiredSkoolPlan: config.requiredSkoolPlan,
          skoolPlansUrl: config.skoolPlansUrl,
          registrationPageUrl: config.registrationPageUrl,
          active: config.active
        }
      });
      console.log(`   Updated configuration`);
    } else {
      await prisma.webinarEvent.create({
        data: {
          webinarId: config.webinarId,
          name: config.name,
          description: config.description,
          startDateTime: config.startDateTime,
          timezone: config.timezone,
          durationMinutes: config.durationMinutes,
          webinarJamWebinarId: config.webinarJamWebinarId,
          webinarJamScheduleId: config.webinarJamScheduleId,
          webinarJamHash: config.webinarJamHash,
          qualificationMethod: config.qualificationMethod,
          requiredSkoolPlan: config.requiredSkoolPlan,
          skoolPlansUrl: config.skoolPlansUrl,
          registrationPageUrl: config.registrationPageUrl,
          active: config.active
        }
      });
      console.log(`✅ Created webinar event: ${config.webinarId}`);
    }
  }

  console.log('🎉 Webinar events seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding webinar events:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
