// Premium Member Automation Enrollment & Processing
// Created: October 26, 2026
// Handles Premium enrollment, Standard-to-Premium upgrades, scheduling and email sending

import { PrismaClient } from '@prisma/client';
import { PREMIUM_MEMBER_SEQUENCE } from './premium-member-sequence';
import { getPersonalizedSimulatorResults } from './personalize-simulator-results';

const prisma = new PrismaClient();

interface EnrollmentResult {
  success: boolean;
  enrollmentId?: string;
  emailsScheduled?: number;
  standardEmailsCancelled?: number;
  error?: string;
  alreadyEnrolled?: boolean;
}

/**
 * Enroll a Premium member in the follow-up automation sequence
 * Schedule all 6 emails based on their Premium activation timestamp
 * Cancel any pending Standard emails if upgrading
 * Prevent duplicate enrollments and retroactive sends
 */
export async function enrollPremiumMember(
  leadId: string,
  premiumActivatedAt: Date,
  isUpgrade: boolean = false
): Promise<EnrollmentResult> {
  try {
    // Check if automation is active
    if (!PREMIUM_MEMBER_SEQUENCE.active) {
      return {
        success: false,
        error: 'Premium member automation is not active',
      };
    }

    // Check for existing Premium enrollment (prevent duplicates)
    const existingEnrollment = await prisma.automationEnrollment.findFirst({
      where: {
        leadId,
        automationId: PREMIUM_MEMBER_SEQUENCE.id,
        status: { in: ['active', 'completed'] },
      },
    });

    if (existingEnrollment) {
      return {
        success: true,
        alreadyEnrolled: true,
        enrollmentId: existingEnrollment.id,
        emailsScheduled: 0,
      };
    }

    // If upgrading from Standard, cancel all pending Standard emails
    let standardEmailsCancelled = 0;
    if (isUpgrade) {
      const cancelResult = await cancelStandardEmailsOnUpgrade(leadId);
      standardEmailsCancelled = cancelResult.emailsCancelled;
    }

    // Create Premium enrollment record
    const enrollment = await prisma.automationEnrollment.create({
      data: {
        leadId,
        automationId: PREMIUM_MEMBER_SEQUENCE.id,
        status: 'active',
        enrolledAt: new Date(),
        metadata: {
          premiumActivatedAt: premiumActivatedAt.toISOString(),
          source: isUpgrade ? 'standard_to_premium_upgrade' : 'premium_member_joined',
          standardEmailsCancelled: isUpgrade ? standardEmailsCancelled : 0,
        },
      },
    });

    // Schedule all emails based on Premium activation timestamp
    const now = new Date();
    let scheduledCount = 0;

    for (const email of PREMIUM_MEMBER_SEQUENCE.emails) {
      // Calculate scheduled time: premiumActivatedAt + (day * 24 hours)
      const scheduledFor = new Date(premiumActivatedAt.getTime() + email.day * 24 * 60 * 60 * 1000);

      // Skip emails scheduled in the past (retroactive prevention)
      if (scheduledFor < now) {
        console.log(`Skipping Premium Email ${email.day} - scheduled time is in the past`);
        continue;
      }

      // Get lead info for personalization
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        select: { firstName: true, lastName: true, email: true },
      });

      if (!lead) continue;

      // Personalize content (including Simulator results if applicable)
      const personalizedHtml = await personalizeEmailContent(email.htmlContent, lead);
      const personalizedText = await personalizeEmailContent(email.textContent, lead);

      await prisma.scheduledEmail.create({
        data: {
          enrollmentId: enrollment.id,
          leadId,
          automationId: PREMIUM_MEMBER_SEQUENCE.id,
          emailIndex: email.day,
          subject: email.subject,
          htmlContent: personalizedHtml,
          textContent: personalizedText,
          scheduledFor,
          status: 'pending',
          retryCount: 0,
          fromDomain: PREMIUM_MEMBER_SEQUENCE.fromDomain,
          fromName: PREMIUM_MEMBER_SEQUENCE.fromName,
          replyTo: PREMIUM_MEMBER_SEQUENCE.replyTo,
        },
      });

      scheduledCount++;
    }

    console.log(`Premium member enrolled: ${leadId}, ${scheduledCount} emails scheduled`);
    if (isUpgrade) {
      console.log(`Standard-to-Premium upgrade: ${standardEmailsCancelled} Standard emails cancelled`);
    }

    return {
      success: true,
      enrollmentId: enrollment.id,
      emailsScheduled: scheduledCount,
      standardEmailsCancelled: isUpgrade ? standardEmailsCancelled : undefined,
    };
  } catch (error: any) {
    console.error('Error enrolling Premium member:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Cancel all pending Standard emails when member upgrades to Premium
 * This prevents Standard members from receiving upgrade invitations after already upgrading
 */
export async function cancelStandardEmailsOnUpgrade(leadId: string): Promise<{ emailsCancelled: number }> {
  try {
    // Find active Standard enrollment
    const standardEnrollment = await prisma.automationEnrollment.findFirst({
      where: {
        leadId,
        automationId: 'standard-member-onboarding',
        status: 'active',
      },
    });

    if (!standardEnrollment) {
      return { emailsCancelled: 0 };
    }

    // Cancel all pending Standard emails
    const result = await prisma.scheduledEmail.updateMany({
      where: {
        enrollmentId: standardEnrollment.id,
        status: 'pending',
      },
      data: {
        status: 'cancelled',
        cancellationReason: 'Upgraded to Premium',
        cancelledAt: new Date(),
      },
    });

    // Update enrollment status (store cancellation info in metadata)
    await prisma.automationEnrollment.update({
      where: { id: standardEnrollment.id },
      data: {
        status: 'cancelled',
        metadata: {
          cancelledAt: new Date().toISOString(),
          cancellationReason: 'Member upgraded to Premium',
        },
      },
    });

    console.log(`Cancelled ${result.count} pending Standard emails for Premium upgrade: ${leadId}`);

    return { emailsCancelled: result.count };
  } catch (error: any) {
    console.error('Error cancelling Standard emails on upgrade:', error);
    return { emailsCancelled: 0 };
  }
}

/**
 * Check if a member is eligible to receive Premium emails
 * Verifies Premium status before every send
 */
export async function isPremiumMemberEligible(leadId: string): Promise<boolean> {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { skoolPlan: true },
    });

    return lead?.skoolPlan === 'Premium';
  } catch (error) {
    console.error('Error checking Premium eligibility:', error);
    return false;
  }
}

/**
 * Helper: Personalize email content with lead data and Simulator results
 */
async function personalizeEmailContent(content: string, lead: any): Promise<string> {
  let personalized = content;

  // Replace {{firstName}}
  personalized = personalized.replace(/\{\{firstName\}\}/g, lead.firstName || 'Member');

  // Replace {{lastName}} if used
  personalized = personalized.replace(/\{\{lastName\}\}/g, lead.lastName || '');

  // Replace {{email}} if used
  personalized = personalized.replace(/\{\{email\}\}/g, lead.email || '');

  // Replace {{personalizedSimulatorResults}} with actual results or empty
  if (content.includes('{{personalizedSimulatorResults}}')) {
    const simulatorResults = await getPersonalizedSimulatorResults(lead.email);
    const isHtml = content.includes('<');
    const replacementContent = isHtml ? simulatorResults.html : simulatorResults.text;
    personalized = personalized.replace(/\{\{personalizedSimulatorResults\}\}/g, replacementContent);
  }

  return personalized;
}
