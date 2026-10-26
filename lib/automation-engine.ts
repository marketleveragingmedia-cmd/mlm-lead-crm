/**
 * Automation Engine for Email Sequences
 * Created: October 26, 2026
 * 
 * Handles enrollment, scheduling, and sending of automated email sequences
 */

import prisma from './db';
import { sendEmail } from './resend-crm';

export interface AutomationEmail {
  dayNumber: number;
  delayDays: number;
  subject: string;
  html: string;
}

export interface AutomationConfig {
  id: string;
  name: string;
  description?: string;
  triggerType: string;
  triggerValue?: string;
  audienceKey: string;
  fromDomain: string;
  fromName: string;
  fromEmail: string;
  active: boolean;
  emails: AutomationEmail[];
}

/**
 * Enroll a lead into an automation sequence
 */
export async function enrollInAutomation(
  leadId: string,
  automationId: string,
  config: AutomationConfig
): Promise<{ success: boolean; enrollmentId?: string; error?: string }> {
  try {
    // Check if lead exists
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        skoolPlan: true,
        skoolMembershipStartedAt: true,
        createdAt: true
      }
    });

    if (!lead) {
      return { success: false, error: 'Lead not found' };
    }

    // Check for existing enrollment (prevent duplicates)
    const existingEnrollment = await prisma.automationEnrollment.findUnique({
      where: {
        leadId_automationId: {
          leadId,
          automationId
        }
      }
    });

    if (existingEnrollment) {
      console.log(`✅ Lead ${leadId} already enrolled in ${automationId}`);
      return { success: true, enrollmentId: existingEnrollment.id };
    }

    // Create enrollment record
    const enrollment = await prisma.automationEnrollment.create({
      data: {
        leadId,
        automationId,
        enrolledAt: new Date(),
        currentEmailIndex: 0,
        status: 'active'
      }
    });

    console.log(`✅ Enrolled lead ${leadId} in automation ${automationId}`);

    // Calculate base date for scheduling (use SKOOL membership start or lead creation)
    const baseDate = lead.skoolMembershipStartedAt || lead.createdAt;

    // Schedule all emails in the sequence
    const scheduledEmails = [];
    for (let i = 0; i < config.emails.length; i++) {
      const emailConfig = config.emails[i];
      
      // Calculate scheduled time (base date + delay days)
      const scheduledFor = new Date(baseDate);
      scheduledFor.setDate(scheduledFor.getDate() + emailConfig.delayDays);
      
      // Don't schedule emails in the past
      const now = new Date();
      if (scheduledFor < now) {
        console.log(`⏭️  Skipping email ${i} (Day ${emailConfig.dayNumber}) - scheduled time is in the past`);
        continue;
      }
      
      // Replace template variables
      const personalizedHtml = emailConfig.html
        .replace(/\{\{firstName\}\}/g, lead.firstName)
        .replace(/\{\{lastName\}\}/g, lead.lastName)
        .replace(/\{\{email\}\}/g, lead.email);
      
      // Create scheduled email record
      const scheduledEmail = await prisma.scheduledEmail.create({
        data: {
          leadId,
          automationId,
          enrollmentId: enrollment.id,
          emailIndex: i,
          subject: emailConfig.subject,
          htmlContent: personalizedHtml,
          textContent: '', // Could extract text version if needed
          fromDomain: config.fromDomain,
          fromName: config.fromName,
          fromEmail: config.fromEmail,
          scheduledFor,
          status: 'pending'
        }
      });
      
      scheduledEmails.push(scheduledEmail);
      console.log(`📅 Scheduled email ${i} (Day ${emailConfig.dayNumber}) for ${scheduledFor.toISOString()}`);
    }

    console.log(`✅ Scheduled ${scheduledEmails.length} emails for lead ${leadId}`);

    return { success: true, enrollmentId: enrollment.id };
    
  } catch (error: any) {
    console.error(`❌ Error enrolling lead ${leadId} in automation:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Process scheduled emails that are due to be sent
 */
export async function processScheduledEmails(): Promise<{
  processed: number;
  sent: number;
  failed: number;
  cancelled: number;
}> {
  const stats = {
    processed: 0,
    sent: 0,
    failed: 0,
    cancelled: 0
  };

  try {
    // Get emails that are due to send (scheduled time has passed, status is pending)
    const now = new Date();
    const dueEmails = await prisma.scheduledEmail.findMany({
      where: {
        status: 'pending',
        scheduledFor: {
          lte: now
        }
      },
      include: {
        lead: true
      },
      orderBy: {
        scheduledFor: 'asc'
      },
      take: 100 // Process in batches
    });

    console.log(`📬 Processing ${dueEmails.length} scheduled emails...`);

    for (const scheduledEmail of dueEmails) {
      stats.processed++;
      
      try {
        // CRITICAL: Check if member has upgraded to Premium
        // If so, cancel remaining Standard-specific emails
        if (scheduledEmail.automationId === 'standard-member-onboarding') {
          if (scheduledEmail.lead.skoolPlan === 'Premium') {
            console.log(`⏭️  Cancelling Standard email for ${scheduledEmail.lead.email} - upgraded to Premium`);
            
            await prisma.scheduledEmail.update({
              where: { id: scheduledEmail.id },
              data: {
                status: 'cancelled',
                updatedAt: new Date()
              }
            });
            
            // Also cancel enrollment if not already cancelled
            await prisma.automationEnrollment.updateMany({
              where: {
                leadId: scheduledEmail.leadId,
                automationId: scheduledEmail.automationId,
                status: 'active'
              },
              data: {
                status: 'cancelled',
                cancelledAt: new Date(),
                cancellationReason: 'Upgraded to Premium',
                updatedAt: new Date()
              }
            });
            
            stats.cancelled++;
            continue;
          }
        }
        
        // Send email via Resend
        const result = await sendEmail({
          from: `${scheduledEmail.fromName} <${scheduledEmail.fromEmail}>`,
          to: scheduledEmail.lead.email,
          subject: scheduledEmail.subject,
          html: scheduledEmail.htmlContent,
          replyTo: 'samantha@networkleveragingcashflow.com',
          tags: [
            { name: 'automation', value: scheduledEmail.automationId },
            { name: 'email_index', value: scheduledEmail.emailIndex.toString() }
          ]
        });
        
        // Update scheduled email record
        await prisma.scheduledEmail.update({
          where: { id: scheduledEmail.id },
          data: {
            status: 'sent',
            sentAt: new Date(),
            resendId: result.id,
            updatedAt: new Date()
          }
        });
        
        // Update enrollment progress
        await prisma.automationEnrollment.update({
          where: { id: scheduledEmail.enrollmentId },
          data: {
            currentEmailIndex: scheduledEmail.emailIndex + 1,
            updatedAt: new Date()
          }
        });
        
        console.log(`✅ Sent email ${scheduledEmail.emailIndex} to ${scheduledEmail.lead.email} (Resend ID: ${result.id})`);
        stats.sent++;
        
      } catch (error: any) {
        console.error(`❌ Failed to send email ${scheduledEmail.id}:`, error.message);
        
        // Update scheduled email with error
        await prisma.scheduledEmail.update({
          where: { id: scheduledEmail.id },
          data: {
            status: 'failed',
            errorMessage: error.message,
            retryCount: scheduledEmail.retryCount + 1,
            updatedAt: new Date()
          }
        });
        
        stats.failed++;
      }
    }

    console.log(`📊 Email processing complete:`, stats);
    return stats;
    
  } catch (error: any) {
    console.error(`❌ Error processing scheduled emails:`, error.message);
    return stats;
  }
}

/**
 * Cancel all remaining emails for a lead in a specific automation
 * Used when member upgrades from Standard to Premium
 */
export async function cancelAutomation(
  leadId: string,
  automationId: string,
  reason: string = 'Manual cancellation'
): Promise<{ success: boolean; cancelled: number }> {
  try {
    // Cancel enrollment
    const updatedEnrollment = await prisma.automationEnrollment.updateMany({
      where: {
        leadId,
        automationId,
        status: 'active'
      },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: reason,
        updatedAt: new Date()
      }
    });
    
    // Cancel all pending scheduled emails
    const updatedEmails = await prisma.scheduledEmail.updateMany({
      where: {
        leadId,
        automationId,
        status: 'pending'
      },
      data: {
        status: 'cancelled',
        updatedAt: new Date()
      }
    });
    
    console.log(`🚫 Cancelled automation ${automationId} for lead ${leadId}: ${updatedEmails.count} emails cancelled`);
    
    return { success: true, cancelled: updatedEmails.count };
    
  } catch (error: any) {
    console.error(`❌ Error cancelling automation:`, error.message);
    return { success: false, cancelled: 0 };
  }
}

/**
 * Get automation statistics
 */
export async function getAutomationStats(automationId: string) {
  const enrollments = await prisma.automationEnrollment.groupBy({
    by: ['status'],
    where: { automationId },
    _count: true
  });
  
  const emails = await prisma.scheduledEmail.groupBy({
    by: ['status'],
    where: { automationId },
    _count: true
  });
  
  return {
    enrollments: enrollments.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>),
    emails: emails.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>)
  };
}
