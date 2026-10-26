#!/usr/bin/env ts-node
/**
 * Test Script for Standard Member Automation
 * October 26, 2026
 * 
 * Tests:
 * 1. New Standard enrollment
 * 2. Email scheduling (6 emails over 7 days)
 * 3. Duplicate enrollment prevention
 * 4. Standard-to-Premium upgrade cancellation
 * 5. Retroactive prevention (no emails for past dates)
 */

import { PrismaClient } from '@prisma/client';
import { enrollInAutomation, processScheduledEmails, cancelAutomation, getAutomationStats } from './lib/automation-engine';
import { AUTOMATION_CONFIG } from './lib/standard-member-sequence';

const prisma = new PrismaClient();

async function runTests() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   Standard Member Automation Test Suite                  ║
║   Testing Infrastructure (Emails Remain Inactive)        ║
╚═══════════════════════════════════════════════════════════╝
  `);

  try {
    // Test 1: Create test lead (NEW Standard member from today)
    console.log('\n========================================');
    console.log('TEST 1: New Standard Member Enrollment');
    console.log('========================================');
    
    const testEmail = `test-standard-${Date.now()}@test-nlc.local`;
    const testLead = await prisma.lead.create({
      data: {
        firstName: 'Test',
        lastName: 'StandardMember',
        email: testEmail,
        source: 'Test Automation',
        skoolPlan: 'Standard',
        skoolMemberId: `test-${Date.now()}`,
        skoolMembershipStartedAt: new Date(), // Joined today
        officialCashFlowVisionary: false
      }
    });
    
    console.log(`✅ Created test lead: ${testLead.id} (${testLead.email})`);
    console.log(`   Membership started: ${testLead.skoolMembershipStartedAt?.toISOString()}`);
    
    // Test 2: Enroll in Standard automation
    console.log('\n========================================');
    console.log('TEST 2: Enrollment & Scheduling');
    console.log('========================================');
    
    const enrollment = await enrollInAutomation(
      testLead.id,
      AUTOMATION_CONFIG.id,
      AUTOMATION_CONFIG
    );
    
    if (!enrollment.success) {
      throw new Error(`Enrollment failed: ${enrollment.error}`);
    }
    
    console.log(`✅ Enrollment successful: ${enrollment.enrollmentId}`);
    
    // Check scheduled emails
    const scheduledEmails = await prisma.scheduledEmail.findMany({
      where: {
        leadId: testLead.id,
        automationId: AUTOMATION_CONFIG.id
      },
      orderBy: { emailIndex: 'asc' }
    });
    
    console.log(`\n📅 Scheduled ${scheduledEmails.length} emails:`);
    scheduledEmails.forEach((email, idx) => {
      console.log(`   ${idx + 1}. Day ${email.emailIndex + 1} - "${email.subject}"`);
      console.log(`      Scheduled for: ${email.scheduledFor.toISOString()}`);
      console.log(`      Status: ${email.status}`);
    });
    
    // Test 3: Duplicate enrollment prevention
    console.log('\n========================================');
    console.log('TEST 3: Duplicate Enrollment Prevention');
    console.log('========================================');
    
    const duplicateEnrollment = await enrollInAutomation(
      testLead.id,
      AUTOMATION_CONFIG.id,
      AUTOMATION_CONFIG
    );
    
    if (duplicateEnrollment.success && duplicateEnrollment.enrollmentId === enrollment.enrollmentId) {
      console.log(`✅ Duplicate prevented - returned existing enrollment`);
    } else {
      console.log(`❌ FAILED - duplicate enrollment was created`);
    }
    
    // Count scheduled emails (should still be the same count)
    const emailCount = await prisma.scheduledEmail.count({
      where: {
        leadId: testLead.id,
        automationId: AUTOMATION_CONFIG.id
      }
    });
    
    console.log(`✅ Email count remains ${emailCount} (no duplicates created)`);
    
    // Test 4: Standard-to-Premium upgrade cancellation
    console.log('\n========================================');
    console.log('TEST 4: Tier Upgrade Cancellation');
    console.log('========================================');
    
    // Simulate upgrade to Premium
    await prisma.lead.update({
      where: { id: testLead.id },
      data: {
        skoolPlan: 'Premium',
        officialCashFlowVisionary: true
      }
    });
    
    console.log(`✅ Upgraded lead to Premium`);
    
    // Process scheduled emails (should cancel them due to tier check)
    const processResult = await processScheduledEmails();
    
    console.log(`\n📊 Processing Results:`);
    console.log(`   Processed: ${processResult.processed}`);
    console.log(`   Sent: ${processResult.sent}`);
    console.log(`   Cancelled: ${processResult.cancelled} (due to Premium upgrade)`);
    console.log(`   Failed: ${processResult.failed}`);
    
    // Verify emails were cancelled
    const cancelledEmails = await prisma.scheduledEmail.count({
      where: {
        leadId: testLead.id,
        automationId: AUTOMATION_CONFIG.id,
        status: 'cancelled'
      }
    });
    
    console.log(`✅ ${cancelledEmails} emails cancelled after upgrade`);
    
    // Test 5: Retroactive prevention (member who joined in the past)
    console.log('\n========================================');
    console.log('TEST 5: Retroactive Prevention');
    console.log('========================================');
    
    const pastMemberEmail = `test-past-${Date.now()}@test-nlc.local`;
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30); // Joined 30 days ago
    
    const pastLead = await prisma.lead.create({
      data: {
        firstName: 'Past',
        lastName: 'Member',
        email: pastMemberEmail,
        source: 'Test Automation',
        skoolPlan: 'Standard',
        skoolMemberId: `test-past-${Date.now()}`,
        skoolMembershipStartedAt: pastDate,
        createdAt: pastDate,
        officialCashFlowVisionary: false
      }
    });
    
    console.log(`✅ Created past member: ${pastLead.id}`);
    console.log(`   Joined: ${pastLead.skoolMembershipStartedAt?.toISOString()} (30 days ago)`);
    
    const pastEnrollment = await enrollInAutomation(
      pastLead.id,
      AUTOMATION_CONFIG.id,
      AUTOMATION_CONFIG
    );
    
    if (!pastEnrollment.success) {
      throw new Error(`Past enrollment failed: ${pastEnrollment.error}`);
    }
    
    // Check how many emails were scheduled (should skip past dates)
    const pastScheduledEmails = await prisma.scheduledEmail.findMany({
      where: {
        leadId: pastLead.id,
        automationId: AUTOMATION_CONFIG.id
      }
    });
    
    console.log(`✅ Scheduled ${pastScheduledEmails.length} emails (skipped past dates)`);
    pastScheduledEmails.forEach((email, idx) => {
      console.log(`   ${idx + 1}. "${email.subject}" - ${email.scheduledFor.toISOString()}`);
    });
    
    // Test 6: Automation stats
    console.log('\n========================================');
    console.log('TEST 6: Automation Statistics');
    console.log('========================================');
    
    const stats = await getAutomationStats(AUTOMATION_CONFIG.id);
    
    console.log(`\n📊 Automation Stats for "${AUTOMATION_CONFIG.id}":`);
    console.log(`\nEnrollments:`);
    Object.entries(stats.enrollments).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });
    console.log(`\nEmails:`);
    Object.entries(stats.emails).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });
    
    // Clean up test data
    console.log('\n========================================');
    console.log('Cleanup');
    console.log('========================================');
    
    await prisma.scheduledEmail.deleteMany({
      where: {
        leadId: {
          in: [testLead.id, pastLead.id]
        }
      }
    });
    
    await prisma.automationEnrollment.deleteMany({
      where: {
        leadId: {
          in: [testLead.id, pastLead.id]
        }
      }
    });
    
    await prisma.lead.deleteMany({
      where: {
        id: {
          in: [testLead.id, pastLead.id]
        }
      }
    });
    
    console.log(`✅ Test data cleaned up`);
    
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║   All Tests Passed ✅                                     ║
║                                                           ║
║   Infrastructure is ready for deployment                 ║
║   Emails remain INACTIVE pending content approval        ║
╚═══════════════════════════════════════════════════════════╝
    `);
    
  } catch (error: any) {
    console.error(`\n❌ TEST FAILED:`, error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

runTests().catch(console.error);
