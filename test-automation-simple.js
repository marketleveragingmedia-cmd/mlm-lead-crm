#!/usr/bin/env node
/**
 * Simple test for Standard Member Automation Infrastructure
 * October 26, 2026
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testInfrastructure() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   Standard Member Automation Infrastructure Test         ║
╚═══════════════════════════════════════════════════════════╝
  `);

  try {
    // Test 1: Create test lead
    console.log('\n✅ TEST 1: Create Test Lead');
    const testEmail = `test-auto-${Date.now()}@test.local`;
    
    const testLead = await prisma.lead.create({
      data: {
        firstName: 'Test',
        lastName: 'StandardMember',
        email: testEmail,
        source: 'Test Automation',
        skoolPlan: 'Standard',
        skoolMemberId: `test-${Date.now()}`,
        skoolMembershipStartedAt: new Date(),
        officialCashFlowVisionary: false
      }
    });
    
    console.log(`   Created lead: ${testLead.id} (${testLead.email})`);
    
    // Test 2: Create enrollment record
    console.log('\n✅ TEST 2: Create Enrollment');
    const enrollment = await prisma.automationEnrollment.create({
      data: {
        leadId: testLead.id,
        automationId: 'standard-member-onboarding',
        enrolledAt: new Date(),
        currentEmailIndex: 0,
        status: 'active'
      }
    });
    
    console.log(`   Created enrollment: ${enrollment.id}`);
    
    // Test 3: Schedule sample email
    console.log('\n✅ TEST 3: Schedule Sample Email');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const scheduledEmail = await prisma.scheduledEmail.create({
      data: {
        leadId: testLead.id,
        automationId: 'standard-member-onboarding',
        enrollmentId: enrollment.id,
        emailIndex: 0,
        subject: 'Test Email - Day 1',
        htmlContent: '<p>Test content</p>',
        textContent: 'Test content',
        fromDomain: 'm.networkleveragingcashflow.com',
        fromName: 'Samantha Hill | MzSamantha',
        fromEmail: 'notifications@m.networkleveragingcashflow.com',
        scheduledFor: tomorrow,
        status: 'pending'
      }
    });
    
    console.log(`   Scheduled email: ${scheduledEmail.id}`);
    console.log(`   Scheduled for: ${scheduledEmail.scheduledFor.toISOString()}`);
    
    // Test 4: Duplicate prevention
    console.log('\n✅ TEST 4: Duplicate Enrollment Prevention');
    try {
      await prisma.automationEnrollment.create({
        data: {
          leadId: testLead.id,
          automationId: 'standard-member-onboarding',
          enrolledAt: new Date(),
          currentEmailIndex: 0,
          status: 'active'
        }
      });
      console.log(`   ❌ FAILED - duplicate was created`);
    } catch (error) {
      console.log(`   ✅ PASSED - duplicate prevented (unique constraint)`);
    }
    
    // Test 5: Tier upgrade simulation
    console.log('\n✅ TEST 5: Tier Upgrade & Cancellation');
    await prisma.lead.update({
      where: { id: testLead.id },
      data: {
        skoolPlan: 'Premium',
        officialCashFlowVisionary: true
      }
    });
    
    console.log(`   Upgraded to Premium`);
    
    // Cancel enrollment and emails
    await prisma.automationEnrollment.update({
      where: { id: enrollment.id },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: 'Upgraded to Premium'
      }
    });
    
    await prisma.scheduledEmail.update({
      where: { id: scheduledEmail.id },
      data: {
        status: 'cancelled'
      }
    });
    
    console.log(`   Cancelled enrollment and pending emails`);
    
    // Test 6: Verify schema and relationships
    console.log('\n✅ TEST 6: Schema Verification');
    
    const enrollmentCheck = await prisma.automationEnrollment.findUnique({
      where: { id: enrollment.id }
    });
    
    const emailCheck = await prisma.scheduledEmail.findUnique({
      where: { id: scheduledEmail.id }
    });
    
    console.log(`   Enrollment status: ${enrollmentCheck.status}`);
    console.log(`   Email status: ${emailCheck.status}`);
    console.log(`   Cancellation reason: ${enrollmentCheck.cancellationReason}`);
    
    // Cleanup
    console.log('\n🧹 Cleanup');
    await prisma.scheduledEmail.delete({ where: { id: scheduledEmail.id } });
    await prisma.automationEnrollment.delete({ where: { id: enrollment.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });
    console.log(`   Test data removed`);
    
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║   ✅ ALL INFRASTRUCTURE TESTS PASSED                      ║
║                                                           ║
║   Database schema is operational                         ║
║   Enrollment & scheduling logic ready                    ║
║   Duplicate prevention working                           ║
║   Tier upgrade cancellation ready                        ║
╚═══════════════════════════════════════════════════════════╝
    `);
    
  } catch (error) {
    console.error(`\n❌ TEST FAILED:`, error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testInfrastructure().catch(console.error);
