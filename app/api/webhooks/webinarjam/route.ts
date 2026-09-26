// WebinarJam Webhook Handler
// Handles: register, attend, miss, leave_early events
// Authentication: Bearer token

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fireWebinarTag } from '@/lib/global-control-webinar';

const WEBHOOK_SECRET = process.env.WEBINARJAM_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Bearer token
    const authHeader = req.headers.get('authorization');
    const expectedToken = `Bearer ${WEBHOOK_SECRET}`;
    
    if (!WEBHOOK_SECRET) {
      console.error('❌ WEBINARJAM_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (authHeader !== expectedToken) {
      console.warn('⚠️ Invalid WebinarJam webhook authentication');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse payload
    const payload = await req.json();
    const { trigger, lead, links, webinar } = payload;

    if (!trigger || !lead || !lead.email) {
      console.error('❌ Invalid webhook payload', payload);
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    console.log(`📥 WebinarJam webhook received: ${trigger} for ${lead.email}`);

    // 3. Check idempotency (prevent duplicate processing)
    const email = lead.email.toLowerCase().trim();
    const now = new Date();
    const compositeKey = `${email}:${trigger}:${Math.floor(now.getTime() / (60 * 60 * 1000))}`; // 1-hour window
    
    const existingEvent = await prisma.webinarJamEvent.findUnique({
      where: { compositeKey }
    });

    if (existingEvent && existingEvent.processed) {
      console.log(`✅ Event already processed: ${compositeKey}`);
      return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 });
    }

    // 4. Find lead by email
    let existingLead = await prisma.lead.findUnique({
      where: { email },
      include: { webinarRegistrations: true }
    });

    // 5. Create lead if doesn't exist (shouldn't happen normally)
    if (!existingLead) {
      console.log(`⚠️ Lead not found, creating: ${email}`);
      existingLead = await prisma.lead.create({
        data: {
          email,
          firstName: lead.first_name || 'Unknown',
          lastName: lead.last_name || 'Unknown',
          phone: lead.phone_number || null,
          source: 'WebinarJam Webhook',
          sourcePage: webinar?.name || 'Unknown Webinar'
        },
        include: { webinarRegistrations: true }
      });
    }

    // 6. Store webhook event
    const webhookEvent = await prisma.webinarJamEvent.create({
      data: {
        leadId: existingLead.id,
        compositeKey,
        trigger,
        webinarJamWebinarId: webinar?.id || null,
        webinarJamWebinarName: webinar?.name || null,
        email: lead.email,
        firstName: lead.first_name || null,
        lastName: lead.last_name || null,
        phoneCountryCode: lead.phone_country_code || null,
        phoneNumber: lead.phone_number || null,
        liveRoomUrl: links?.live_room || null,
        replayRoomUrl: links?.replay_room || null,
        unsubscribeUrl: links?.unsubscribe || null,
        rawPayload: payload,
        processed: false,
        receivedAt: now
      }
    });

    // 7. Process event based on trigger
    try {
      switch (trigger) {
        case 'register':
          await handleRegistration(existingLead, payload, webhookEvent.id);
          break;
        case 'attend':
          await handleAttendance(existingLead, payload, webhookEvent.id);
          break;
        case 'miss':
          await handleNoShow(existingLead, payload, webhookEvent.id);
          break;
        case 'leave_early':
          await handleLeftEarly(existingLead, payload, webhookEvent.id);
          break;
        default:
          console.warn(`⚠️ Unknown trigger type: ${trigger}`);
      }

      // Mark as processed
      await prisma.webinarJamEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: true,
          processedAt: new Date()
        }
      });

      console.log(`✅ WebinarJam webhook processed successfully: ${trigger} for ${email}`);
    } catch (processError) {
      // Mark as failed
      await prisma.webinarJamEvent.update({
        where: { id: webhookEvent.id },
        data: {
          processed: false,
          errorMessage: String(processError)
        }
      });
      throw processError;
    }

    // 8. Return 200 quickly
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('❌ Error processing WebinarJam webhook:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: String(error) 
    }, { status: 500 });
  }
}

// Handle registration webhook
async function handleRegistration(lead: any, payload: any, eventId: string) {
  const webinarId = 'CFI-2026-10-08'; // TODO: Derive from payload when multiple webinars exist
  
  // Find or create webinar event
  const webinarEvent = await prisma.webinarEvent.findUnique({
    where: { webinarId }
  });

  if (!webinarEvent) {
    throw new Error(`Webinar event not found: ${webinarId}`);
  }

  // Update or create WebinarRegistration
  const registration = await prisma.webinarRegistration.upsert({
    where: {
      leadId_webinarEventId: {
        leadId: lead.id,
        webinarEventId: webinarEvent.id
      }
    },
    create: {
      leadId: lead.id,
      webinarEventId: webinarEvent.id,
      source: 'webinar-registration-page',
      qualificationMethod: webinarEvent.qualificationMethod,
      webinarJamLiveRoomUrl: payload.links?.live_room || null,
      webinarJamReplayRoomUrl: payload.links?.replay_room || null,
      registrationStatus: 'registered',
      registeredAt: new Date(),
      status: 'registered',
      webinarEligible: true,
      webinarEligibleSince: new Date()
    },
    update: {
      registrationStatus: 'registered',
      registeredAt: new Date(),
      status: 'registered',
      webinarJamLiveRoomUrl: payload.links?.live_room || null,
      webinarJamReplayRoomUrl: payload.links?.replay_room || null
    }
  });

  console.log(`✅ Registration processed for ${lead.email}`);

  // Fire Global Control tag
  const webinarSlug = 'cfi-oct-2026'; // TODO: Derive from webinarId
  await fireWebinarTag(
    `webinar-${webinarSlug}-registered`,
    lead.email,
    lead.firstName,
    lead.lastName,
    lead.phone
  );
}

// Handle attendance webhook
async function handleAttendance(lead: any, payload: any, eventId: string) {
  const webinarId = 'CFI-2026-10-08';
  
  const webinarEvent = await prisma.webinarEvent.findUnique({
    where: { webinarId }
  });

  if (!webinarEvent) {
    throw new Error(`Webinar event not found: ${webinarId}`);
  }

  // Update registration
  const registration = await prisma.webinarRegistration.updateMany({
    where: {
      leadId: lead.id,
      webinarEventId: webinarEvent.id
    },
    data: {
      attended: true,
      attendedAt: new Date(),
      status: 'attended'
    }
  });

  console.log(`✅ Attendance recorded for ${lead.email}`);

  // Fire Global Control tag
  const webinarSlug = 'cfi-oct-2026';
  await fireWebinarTag(
    `webinar-${webinarSlug}-attended`,
    lead.email,
    lead.firstName,
    lead.lastName,
    lead.phone
  );
}

// Handle no-show webhook
async function handleNoShow(lead: any, payload: any, eventId: string) {
  const webinarId = 'CFI-2026-10-08';
  
  const webinarEvent = await prisma.webinarEvent.findUnique({
    where: { webinarId }
  });

  if (!webinarEvent) {
    throw new Error(`Webinar event not found: ${webinarId}`);
  }

  // Update registration
  await prisma.webinarRegistration.updateMany({
    where: {
      leadId: lead.id,
      webinarEventId: webinarEvent.id
    },
    data: {
      attended: false,
      status: 'no_show'
    }
  });

  console.log(`✅ No-show recorded for ${lead.email}`);

  // Fire Global Control tag
  const webinarSlug = 'cfi-oct-2026';
  await fireWebinarTag(
    `webinar-${webinarSlug}-no-show`,
    lead.email,
    lead.firstName,
    lead.lastName,
    lead.phone
  );
}

// Handle left early webhook
async function handleLeftEarly(lead: any, payload: any, eventId: string) {
  const webinarId = 'CFI-2026-10-08';
  
  const webinarEvent = await prisma.webinarEvent.findUnique({
    where: { webinarId }
  });

  if (!webinarEvent) {
    throw new Error(`Webinar event not found: ${webinarId}`);
  }

  // Update registration
  await prisma.webinarRegistration.updateMany({
    where: {
      leadId: lead.id,
      webinarEventId: webinarEvent.id
    },
    data: {
      attended: true, // They did attend
      leftEarly: true,
      attendedAt: new Date(),
      status: 'left_early'
    }
  });

  console.log(`✅ Left early recorded for ${lead.email}`);
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    status: 'WebinarJam webhook endpoint active',
    url: 'https://mlm-lead-crm.vercel.app/api/webhooks/webinarjam'
  });
}
