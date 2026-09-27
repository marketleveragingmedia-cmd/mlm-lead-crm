// Global Control Outbox - Durable Tag Delivery
// Ensures tag firing succeeds even if Global Control is temporarily unavailable

import { prisma } from './prisma';
import { fireWebinarTag } from './global-control-webinar';

// Enqueue a tag for durable delivery
export async function enqueueTag(
  tagName: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
  phone: string | null
): Promise<void> {
  try {
    // Create outbox record for retry
    await prisma.globalControlOutbox.create({
      data: {
        tagName,
        email,
        firstName,
        lastName,
        phone,
        status: 'pending',
        attempts: 0
      }
    });

    console.log(`  📤 Tag queued for delivery: ${tagName}`);

    // Attempt immediate delivery (best effort)
    await processTagDelivery(tagName, email, firstName, lastName, phone);

  } catch (error) {
    console.error(`  ⚠️ Failed to enqueue tag (critical):`, error);
    // If we can't even queue it, log and continue (don't block registration)
  }
}

// Process tag delivery (called immediately and on retry)
async function processTagDelivery(
  tagName: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
  phone: string | null
): Promise<boolean> {
  try {
    const success = await fireWebinarTag(tagName, email, firstName, lastName, phone);
    
    if (success) {
      // Mark as delivered
      await prisma.globalControlOutbox.updateMany({
        where: {
          tagName,
          email,
          status: { in: ['pending', 'retrying'] }
        },
        data: {
          status: 'delivered',
          deliveredAt: new Date()
        }
      });
      
      console.log(`  ✅ Tag delivered: ${tagName}`);
      return true;
    } else {
      // Mark as failed for retry
      await prisma.globalControlOutbox.updateMany({
        where: {
          tagName,
          email,
          status: { in: ['pending', 'retrying'] }
        },
        data: {
          status: 'retrying',
          attempts: { increment: 1 },
          lastAttemptAt: new Date(),
          lastError: 'Tag fire returned false'
        }
      });
      
      console.log(`  ⚠️ Tag delivery failed, will retry: ${tagName}`);
      return false;
    }
  } catch (error) {
    // Store error for retry
    await prisma.globalControlOutbox.updateMany({
      where: {
        tagName,
        email,
        status: { in: ['pending', 'retrying'] }
      },
      data: {
        status: 'retrying',
        attempts: { increment: 1 },
        lastAttemptAt: new Date(),
        lastError: String(error)
      }
    });
    
    console.error(`  ❌ Tag delivery error:`, error);
    return false;
  }
}

// Retry pending/failed tags (called by cron/scheduled job)
export async function retryPendingTags(): Promise<void> {
  console.log('🔄 Retrying pending Global Control tags...');

  // Find pending/retrying tags (max 10 attempts)
  const pending = await prisma.globalControlOutbox.findMany({
    where: {
      status: { in: ['pending', 'retrying'] },
      attempts: { lt: 10 }
    },
    orderBy: { createdAt: 'asc' },
    take: 50 // Process in batches
  });

  if (pending.length === 0) {
    console.log('  ℹ️ No pending tags to retry');
    return;
  }

  console.log(`  📋 Found ${pending.length} pending tag(s)`);

  for (const record of pending) {
    await processTagDelivery(
      record.tagName,
      record.email,
      record.firstName,
      record.lastName,
      record.phone
    );
  }

  console.log('✅ Retry pass complete');
}

// Mark permanently failed after max attempts
export async function markPermanentFailures(): Promise<void> {
  const result = await prisma.globalControlOutbox.updateMany({
    where: {
      status: { in: ['pending', 'retrying'] },
      attempts: { gte: 10 }
    },
    data: {
      status: 'failed',
      lastError: 'Max retry attempts exceeded'
    }
  });

  if (result.count > 0) {
    console.log(`⚠️ Marked ${result.count} tag(s) as permanently failed`);
  }
}
