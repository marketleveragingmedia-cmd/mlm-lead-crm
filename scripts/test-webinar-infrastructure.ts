// Comprehensive Webinar Infrastructure Test Suite
// Tests all components without hitting external APIs

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runTests() {
  console.log('🧪 Starting Webinar Infrastructure Tests\n');
  
  let passCount = 0;
  let failCount = 0;

  // TEST A: WebinarEvent Configuration Exists
  try {
    console.log('TEST A: WebinarEvent configuration exists');
    const event = await prisma.webinarEvent.findUnique({
      where: { webinarId: 'CFI-2026-10-08' }
    });
    
    if (event && event.webinarJamWebinarId === 32 && event.webinarJamScheduleId === 48) {
      console.log('✅ PASS: WebinarEvent found with correct configuration\n');
      passCount++;
    } else {
      console.log('❌ FAIL: WebinarEvent missing or incorrect\n');
      failCount++;
    }
  } catch (error) {
    console.log('❌ FAIL: Error querying WebinarEvent:', error, '\n');
    failCount++;
  }

  // TEST B: Can create WebinarRegistration
  try {
    console.log('TEST B: Can create WebinarRegistration for new lead');
    
    // Create test lead
    const testEmail = `test-webinar-${Date.now()}@test.com`;
    const testLead = await prisma.lead.create({
      data: {
        email: testEmail,
        firstName: 'Test',
        lastName: 'Webinar',
        source: 'test'
      }
    });

    const webinarEvent = await prisma.webinarEvent.findUnique({
      where: { webinarId: 'CFI-2026-10-08' }
    });

    if (!webinarEvent) throw new Error('WebinarEvent not found');

    // Create registration
    const registration = await prisma.webinarRegistration.create({
      data: {
        leadId: testLead.id,
        webinarEventId: webinarEvent.id,
        source: 'test',
        qualificationMethod: 'skool_premium',
        status: 'lead_captured'
      }
    });

    console.log('✅ PASS: WebinarRegistration created successfully');
    console.log(`   ID: ${registration.id}\n`);
    passCount++;

    // Cleanup
    await prisma.webinarRegistration.delete({ where: { id: registration.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });

  } catch (error) {
    console.log('❌ FAIL: Error creating WebinarRegistration:', error, '\n');
    failCount++;
  }

  // TEST C: Duplicate prevention (unique constraint)
  try {
    console.log('TEST C: Prevent duplicate WebinarRegistration');
    
    const testEmail = `test-dup-${Date.now()}@test.com`;
    const testLead = await prisma.lead.create({
      data: {
        email: testEmail,
        firstName: 'Test',
        lastName: 'Duplicate',
        source: 'test'
      }
    });

    const webinarEvent = await prisma.webinarEvent.findUnique({
      where: { webinarId: 'CFI-2026-10-08' }
    });

    if (!webinarEvent) throw new Error('WebinarEvent not found');

    // Create first registration
    const reg1 = await prisma.webinarRegistration.create({
      data: {
        leadId: testLead.id,
        webinarEventId: webinarEvent.id,
        source: 'test',
        qualificationMethod: 'skool_premium',
        status: 'lead_captured'
      }
    });

    // Try to create duplicate (should fail)
    try {
      await prisma.webinarRegistration.create({
        data: {
          leadId: testLead.id,
          webinarEventId: webinarEvent.id,
          source: 'test-dup',
          qualificationMethod: 'skool_premium',
          status: 'lead_captured'
        }
      });
      
      console.log('❌ FAIL: Duplicate registration was allowed\n');
      failCount++;
    } catch (dupError: any) {
      if (dupError.code === 'P2002') {
        console.log('✅ PASS: Duplicate registration prevented by unique constraint\n');
        passCount++;
      } else {
        throw dupError;
      }
    }

    // Cleanup
    await prisma.webinarRegistration.delete({ where: { id: reg1.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });

  } catch (error) {
    console.log('❌ FAIL: Error in duplicate prevention test:', error, '\n');
    failCount++;
  }

  // TEST D: WebinarJamEvent storage
  try {
    console.log('TEST D: Can store WebinarJamEvent');
    
    const testEmail = `test-event-${Date.now()}@test.com`;
    const testLead = await prisma.lead.create({
      data: {
        email: testEmail,
        firstName: 'Test',
        lastName: 'Event',
        source: 'test'
      }
    });

    const event = await prisma.webinarJamEvent.create({
      data: {
        leadId: testLead.id,
        compositeKey: `${testEmail}:register:${Date.now()}`,
        trigger: 'register',
        email: testEmail,
        firstName: 'Test',
        lastName: 'Event',
        rawPayload: {
          trigger: 'register',
          lead: { email: testEmail, first_name: 'Test', last_name: 'Event' },
          webinar: { id: 32, name: 'Test Webinar' }
        },
        processed: false
      }
    });

    console.log('✅ PASS: WebinarJamEvent created successfully');
    console.log(`   ID: ${event.id}\n`);
    passCount++;

    // Cleanup
    await prisma.webinarJamEvent.delete({ where: { id: event.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });

  } catch (error) {
    console.log('❌ FAIL: Error storing WebinarJamEvent:', error, '\n');
    failCount++;
  }

  // TEST E: Idempotency (composite key unique constraint)
  try {
    console.log('TEST E: Webhook idempotency via composite key');
    
    const testEmail = `test-idempotent-${Date.now()}@test.com`;
    const compositeKey = `${testEmail}:register:${Math.floor(Date.now() / 3600000)}`;
    
    const testLead = await prisma.lead.create({
      data: {
        email: testEmail,
        firstName: 'Test',
        lastName: 'Idempotent',
        source: 'test'
      }
    });

    // Create first event
    const event1 = await prisma.webinarJamEvent.create({
      data: {
        leadId: testLead.id,
        compositeKey,
        trigger: 'register',
        email: testEmail,
        rawPayload: { test: 1 },
        processed: true
      }
    });

    // Try to create duplicate with same composite key
    try {
      await prisma.webinarJamEvent.create({
        data: {
          leadId: testLead.id,
          compositeKey,
          trigger: 'register',
          email: testEmail,
          rawPayload: { test: 2 },
          processed: false
        }
      });
      
      console.log('❌ FAIL: Duplicate webhook event was allowed\n');
      failCount++;
    } catch (dupError: any) {
      if (dupError.code === 'P2002') {
        console.log('✅ PASS: Duplicate webhook prevented by composite key\n');
        passCount++;
      } else {
        throw dupError;
      }
    }

    // Cleanup
    await prisma.webinarJamEvent.delete({ where: { id: event1.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });

  } catch (error) {
    console.log('❌ FAIL: Error in idempotency test:', error, '\n');
    failCount++;
  }

  // Summary
  console.log('========================================');
  console.log('📊 TEST SUMMARY');
  console.log('========================================');
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📈 Total:  ${passCount + failCount}`);
  console.log('========================================\n');

  if (failCount === 0) {
    console.log('🎉 ALL TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.log('⚠️  SOME TESTS FAILED\n');
    process.exit(1);
  }
}

runTests()
  .catch((e) => {
    console.error('💥 Test suite crashed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
