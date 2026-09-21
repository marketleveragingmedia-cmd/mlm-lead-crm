import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    
    // Resend webhook event structure
    const {
      type,
      created_at,
      data,
    } = event;

    if (!type || !data) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    const { email_id, to, from, subject } = data;

    // Find lead by email
    const lead = await prisma.lead.findUnique({
      where: { email: to }
    });

    if (!lead) {
      // Lead not found - log but don't error
      console.log(`Webhook event for unknown email: ${to}`);
      return NextResponse.json({ received: true, status: 'lead_not_found' });
    }

    // Map Resend event types to our event types
    const eventTypeMap: Record<string, string> = {
      'email.sent': 'sent',
      'email.delivered': 'delivered',
      'email.delivery_delayed': 'delayed',
      'email.complained': 'complained',
      'email.bounced': 'bounced',
      'email.opened': 'opened',
      'email.clicked': 'clicked',
    };

    const eventType = eventTypeMap[type] || type;

    // Create email event record
    await prisma.emailEvent.create({
      data: {
        leadId: lead.id,
        eventType,
        emailId: email_id,
        metadata: data,
        occurredAt: created_at ? new Date(created_at) : new Date(),
      }
    });

    // Update lead engagement stats
    const updates: any = {};

    switch (eventType) {
      case 'delivered':
        updates.emailsReceived = { increment: 1 };
        break;
      
      case 'opened':
        updates.emailsOpened = { increment: 1 };
        updates.lastEmailOpenedAt = new Date();
        
        // Apply lifecycle tag if this is their 3rd open
        if (lead.emailsOpened + 1 >= 3 && !lead.resendTags.includes('engaged')) {
          updates.resendTags = { push: 'engaged' };
        }
        break;
      
      case 'clicked':
        updates.emailsClicked = { increment: 1 };
        updates.lastEmailClickedAt = new Date();
        
        // Mark as active if clicked in last 7 days
        if (!lead.resendTags.includes('active')) {
          updates.resendTags = { push: 'active' };
        }
        break;
    }

    if (Object.keys(updates).length > 0) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: updates,
      });
    }

    // Check for cold leads (no opens in 30 days)
    if (eventType === 'sent') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      if (lead.lastEmailOpenedAt && new Date(lead.lastEmailOpenedAt) < thirtyDaysAgo) {
        if (!lead.resendTags.includes('cold')) {
          await prisma.lead.update({
            where: { id: lead.id },
            data: {
              resendTags: { push: 'cold' },
            }
          });
        }
      }
    }

    return NextResponse.json({ 
      received: true,
      leadId: lead.id,
      eventType,
      updated: Object.keys(updates).length > 0,
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Verify webhook signature (if Resend provides one)
async function verifyWebhookSignature(request: NextRequest): Promise<boolean> {
  // TODO: Add signature verification when Resend provides webhook signing
  return true;
}
