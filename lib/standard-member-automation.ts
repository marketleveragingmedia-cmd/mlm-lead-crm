// Standard Member Automation Enrollment & Processing
// Created: October 26, 2026
// Handles enrollment, scheduling, tier checks, and email sending

import { PrismaClient } from '@prisma/client';
import { STANDARD_MEMBER_SEQUENCE } from './standard-member-sequence';
import { getPersonalizedSimulatorResults } from './personalize-simulator-results';

const prisma = new PrismaClient();

interface EnrollmentResult {
  success: boolean;
  enrollmentId?: string;
  emailsScheduled?: number;
  error?: string;
  alreadyEnrolled?: boolean;
}

interface ProcessResult {
  success: boolean;
  emailsSent: number;
  emailsCancelled: number;
  emailsFailed: number;
  errors: string[];
}

/**
 * Enroll a Standard member in the follow-up automation sequence
 * Schedule all 6 emails based on their join timestamp
 * Prevent duplicate enrollments and retroactive sends
 */
export async function enrollStandardMember(
  leadId: string,
  joinedAt: Date
): Promise<EnrollmentResult> {
  try {
    // Check if automation is active
    if (!STANDARD_MEMBER_SEQUENCE.active) {
      return {
        success: false,
        error: 'Standard member automation is not active',
      };
    }

    // Check for existing enrollment (prevent duplicates)
    const existingEnrollment = await prisma.automationEnrollment.findFirst({
      where: {
        leadId,
        automationId: STANDARD_MEMBER_SEQUENCE.id,
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

    // Create enrollment record
    const enrollment = await prisma.automationEnrollment.create({
      data: {
        leadId,
        automationId: STANDARD_MEMBER_SEQUENCE.id,
        status: 'active',
        enrolledAt: new Date(),
        metadata: {
          joinedAt: joinedAt.toISOString(),
          source: 'skool_standard_member',
        },
      },
    });

    // Schedule all emails based on join timestamp
    const now = new Date();
    let scheduledCount = 0;

    for (const email of STANDARD_MEMBER_SEQUENCE.emails) {
      // Calculate scheduled time: joinedAt + (day * 24 hours)
      const scheduledFor = new Date(joinedAt.getTime() + email.day * 24 * 60 * 60 * 1000);

      // Skip emails scheduled in the past (retroactive prevention)
      if (scheduledFor < now) {
        console.log(`Skipping Email ${email.day} - scheduled time is in the past`);
        continue;
      }

      await prisma.scheduledEmail.create({
        data: {
          enrollmentId: enrollment.id,
          leadId,
          automationId: STANDARD_MEMBER_SEQUENCE.id,
          emailIndex: email.day,
          subject: email.subject,
          htmlContent: email.htmlContent,
          textContent: email.textContent,
          scheduledFor,
          status: 'pending',
          fromDomain: STANDARD_MEMBER_SEQUENCE.fromDomain,
          fromName: STANDARD_MEMBER_SEQUENCE.fromName,
          replyTo: STANDARD_MEMBER_SEQUENCE.replyTo,
        },
      });

      scheduledCount++;
    }

    return {
      success: true,
      enrollmentId: enrollment.id,
      emailsScheduled: scheduledCount,
    };
  } catch (error: any) {
    console.error('Error enrolling standard member:', error);
    return {
      success: false,
      error: error.message || 'Unknown enrollment error',
    };
  }
}

/**
 * Process scheduled emails that are due to send
 * Check tier status before sending (cancel if upgraded to Premium)
 * Handle personalization, Resend API, retries, and errors
 */
export async function processScheduledEmails(): Promise<ProcessResult> {
  const result: ProcessResult = {
    success: true,
    emailsSent: 0,
    emailsCancelled: 0,
    emailsFailed: 0,
    errors: [],
  };

  try {
    const now = new Date();

    // Find all pending emails scheduled to send now or earlier
    const dueEmails = await prisma.scheduledEmail.findMany({
      where: {
        status: 'pending',
        scheduledFor: { lte: now },
      },
      include: {
        lead: true,
        enrollment: true,
      },
      orderBy: { scheduledFor: 'asc' },
      take: 50, // Process in batches
    });

    console.log(`Found ${dueEmails.length} emails due to send`);

    for (const scheduledEmail of dueEmails) {
      try {
        // TIER CHECK: Cancel if member upgraded to Premium
        if (scheduledEmail.lead.skoolPlan === 'Premium') {
          await prisma.scheduledEmail.update({
            where: { id: scheduledEmail.id },
            data: {
              status: 'cancelled',
              cancelledAt: new Date(),
              cancellationReason: 'Upgraded to Premium',
            },
          });

          // Update enrollment status if all emails cancelled
          await checkAndUpdateEnrollmentStatus(scheduledEmail.enrollmentId);

          result.emailsCancelled++;
          console.log(`Cancelled email for ${scheduledEmail.lead.email} - upgraded to Premium`);
          continue;
        }

        // PERSONALIZE CONTENT
        const personalizedSubject = personalizeBasic(scheduledEmail.subject, scheduledEmail.lead);
        const personalizedHtml = await personalizeContent(scheduledEmail.htmlContent, scheduledEmail.lead);
        const personalizedText = await personalizeContent(scheduledEmail.textContent, scheduledEmail.lead);

        // SEND VIA RESEND API
        const sendResult = await sendEmailViaResend({
          to: scheduledEmail.lead.email,
          subject: personalizedSubject,
          html: personalizedHtml,
          text: personalizedText,
          fromDomain: scheduledEmail.fromDomain,
          fromName: scheduledEmail.fromName,
          replyTo: scheduledEmail.replyTo,
        });

        if (sendResult.success) {
          // Mark as sent
          await prisma.scheduledEmail.update({
            where: { id: scheduledEmail.id },
            data: {
              status: 'sent',
              sentAt: new Date(),
              resendMessageId: sendResult.messageId,
            },
          });

          result.emailsSent++;
          console.log(`Sent Email ${scheduledEmail.emailIndex} to ${scheduledEmail.lead.email}`);
        } else {
          // Handle failure - retry logic
          const retryCount = scheduledEmail.retryCount || 0;

          if (retryCount < 3) {
            // Retry later
            await prisma.scheduledEmail.update({
              where: { id: scheduledEmail.id },
              data: {
                retryCount: retryCount + 1,
                lastError: sendResult.error,
                scheduledFor: new Date(now.getTime() + 60 * 60 * 1000), // Retry in 1 hour
              },
            });
            console.log(`Scheduled retry for ${scheduledEmail.lead.email} (attempt ${retryCount + 1})`);
          } else {
            // Max retries exceeded - mark as failed
            await prisma.scheduledEmail.update({
              where: { id: scheduledEmail.id },
              data: {
                status: 'failed',
                lastError: sendResult.error,
              },
            });
            result.emailsFailed++;
            result.errors.push(`Failed to send to ${scheduledEmail.lead.email}: ${sendResult.error}`);
          }
        }
      } catch (emailError: any) {
        console.error(`Error processing email ${scheduledEmail.id}:`, emailError);
        result.emailsFailed++;
        result.errors.push(`Email ${scheduledEmail.id}: ${emailError.message}`);
      }
    }

    return result;
  } catch (error: any) {
    console.error('Error in processScheduledEmails:', error);
    return {
      success: false,
      emailsSent: 0,
      emailsCancelled: 0,
      emailsFailed: 0,
      errors: [error.message || 'Unknown processing error'],
    };
  }
}

/**
 * Cancel remaining Standard emails when member upgrades to Premium
 */
export async function cancelStandardEmailsOnUpgrade(leadId: string): Promise<void> {
  try {
    // Find active Standard automation enrollment
    const enrollment = await prisma.automationEnrollment.findFirst({
      where: {
        leadId,
        automationId: STANDARD_MEMBER_SEQUENCE.id,
        status: 'active',
      },
    });

    if (!enrollment) {
      return; // No active enrollment
    }

    // Cancel all pending emails
    await prisma.scheduledEmail.updateMany({
      where: {
        enrollmentId: enrollment.id,
        status: 'pending',
      },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: 'Upgraded to Premium',
      },
    });

    // Update enrollment status
    await prisma.automationEnrollment.update({
      where: { id: enrollment.id },
      data: {
        status: 'cancelled',
        completedAt: new Date(),
      },
    });

    console.log(`Cancelled Standard emails for lead ${leadId} due to Premium upgrade`);
  } catch (error) {
    console.error('Error cancelling Standard emails on upgrade:', error);
  }
}

/**
 * Helper: Basic personalization (sync) for subjects
 */
function personalizeBasic(content: string, lead: any): string {
  let personalized = content;
  personalized = personalized.replace(/\{\{firstName\}\}/g, lead.firstName || 'Member');
  personalized = personalized.replace(/\{\{lastName\}\}/g, lead.lastName || '');
  personalized = personalized.replace(/\{\{email\}\}/g, lead.email || '');
  return personalized;
}

/**
 * Helper: Full personalization (async) for content with Simulator results
 */
async function personalizeContent(content: string, lead: any): Promise<string> {
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

/**
 * Helper: Send email via Resend API
 */
async function sendEmailViaResend(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  fromDomain: string;
  fromName: string;
  replyTo: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return { success: false, error: 'RESEND_API_KEY not configured' };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${params.fromName} <notifications@${params.fromDomain}>`,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        reply_to: params.replyTo,
      }),
    });

    const data = await response.json();

    if (response.ok && data.id) {
      return { success: true, messageId: data.id };
    } else {
      return {
        success: false,
        error: data.message || data.error || 'Unknown Resend error',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error sending email',
    };
  }
}

/**
 * Helper: Check if all emails sent/cancelled and update enrollment status
 */
async function checkAndUpdateEnrollmentStatus(enrollmentId: string): Promise<void> {
  const pendingCount = await prisma.scheduledEmail.count({
    where: {
      enrollmentId,
      status: 'pending',
    },
  });

  if (pendingCount === 0) {
    await prisma.automationEnrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    });
  }
}

/**
 * Get automation statistics for monitoring
 */
export async function getAutomationStats() {
  const totalEnrollments = await prisma.automationEnrollment.count({
    where: { automationId: STANDARD_MEMBER_SEQUENCE.id },
  });

  const activeEnrollments = await prisma.automationEnrollment.count({
    where: {
      automationId: STANDARD_MEMBER_SEQUENCE.id,
      status: 'active',
    },
  });

  const emailStats = await prisma.scheduledEmail.groupBy({
    by: ['status'],
    where: { automationId: STANDARD_MEMBER_SEQUENCE.id },
    _count: true,
  });

  return {
    totalEnrollments,
    activeEnrollments,
    emailStats: emailStats.reduce((acc: any, stat) => {
      acc[stat.status] = stat._count;
      return acc;
    }, {}),
  };
}
