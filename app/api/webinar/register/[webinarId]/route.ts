// Masterclass Lead Capture Backend
// POST /api/webinar/register/[webinarId]
// Handles webinar registration with Premium qualification logic

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registerWithWebinarJam } from '@/lib/webinarjam-registration';
import { fireWebinarTag } from '@/lib/global-control-webinar';
import { getWebinarSlug } from '@/lib/webinar-config';

export async function POST(
  req: NextRequest,
  { params }: { params: { webinarId: string } }
) {
  try {
    const webinarId = params.webinarId;
    const body = await req.json();

    const { firstName, lastName, email, phone, source, sourcePage } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      );
    }

    console.log(`📝 Webinar registration request: ${email} for ${webinarId}`);

    // 1. Find WebinarEvent
    const webinarEvent = await prisma.webinarEvent.findUnique({
      where: { webinarId }
    });

    if (!webinarEvent || !webinarEvent.active) {
      return NextResponse.json(
        { error: 'Webinar not found or inactive' },
        { status: 404 }
      );
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // 3. Upsert Lead (preserve original acquisition source)
    let lead = await prisma.lead.findUnique({
      where: { email: normalizedEmail }
    });

    if (lead) {
      console.log(`  ✅ Found existing lead: ${lead.id}`);
      
      // Update name/phone if better data provided and current is placeholder
      const updates: any = {};
      
      if (lead.firstName === 'Unknown' || !lead.firstName) {
        updates.firstName = firstName;
      }
      if (lead.lastName === 'Unknown' || !lead.lastName) {
        updates.lastName = lastName;
      }
      if (phone && !lead.phone) {
        updates.phone = phone;
      }
      
      if (Object.keys(updates).length > 0) {
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: updates
        });
      }
      
    } else {
      console.log(`  🆕 Creating new lead`);
      lead = await prisma.lead.create({
        data: {
          email: normalizedEmail,
          firstName,
          lastName,
          phone: phone || null,
          source: source || 'Masterclass Registration',
          sourcePage: sourcePage || null
        }
      });
    }

    // 4. Create or retrieve WebinarRegistration
    let registration = await prisma.webinarRegistration.findUnique({
      where: {
        leadId_webinarEventId: {
          leadId: lead.id,
          webinarEventId: webinarEvent.id
        }
      }
    });

    if (registration) {
      console.log(`  ✅ Found existing registration: ${registration.id}`);
    } else {
      console.log(`  🆕 Creating new registration`);
      registration = await prisma.webinarRegistration.create({
        data: {
          leadId: lead.id,
          webinarEventId: webinarEvent.id,
          source: source || 'masterclass-registration-page',
          qualificationMethod: webinarEvent.qualificationMethod,
          status: 'lead_captured'
        }
      });

      // Fire lead tag
      const webinarSlug = getWebinarSlug(webinarEvent.webinarId);
      await fireWebinarTag(
        `webinar-${webinarSlug}-lead`,
        lead.email,
        lead.firstName,
        lead.lastName,
        lead.phone
      ).catch(err => {
        console.error('  ⚠️ Global Control tag failed (non-blocking):', err);
      });
    }

    // 5. Check Premium status
    const isPremium = lead.skoolPlan === 'Premium';

    console.log(`  💎 Premium status: ${isPremium}`);

    // 6. ALREADY-PREMIUM BRANCH
    if (isPremium) {
      console.log(`  🎯 Already Premium - qualifying and registering`);

      // Mark as qualified
      if (!registration.webinarEligible) {
        registration = await prisma.webinarRegistration.update({
          where: { id: registration.id },
          data: {
            webinarEligible: true,
            webinarEligibleSince: new Date(),
            qualifiedAt: new Date(),
            status: 'qualified'
          }
        });
      }

      // Register with WebinarJam (idempotent)
      if (registration.registrationStatus !== 'registered') {
        await registerWithWebinarJam(lead, {
          ...registration,
          webinarEvent,
          lead
        });

        // Reload registration to get updated status
        registration = await prisma.webinarRegistration.findUnique({
          where: { id: registration.id }
        }) || registration;
      }

      // Return success
      return NextResponse.json({
        success: true,
        alreadyPremium: true,
        registrationStatus: registration.registrationStatus,
        liveRoomUrl: registration.webinarJamLiveRoomUrl,
        replayRoomUrl: registration.webinarJamReplayRoomUrl,
        message: 'You are already a Premium member. Your webinar registration is confirmed!'
      });

    } 
    // 7. NOT-YET-PREMIUM BRANCH
    else {
      console.log(`  ⏳ Premium pending - returning SKOOL Plans URL`);

      // Ensure pending state
      if (registration.status === 'lead_captured') {
        await prisma.webinarRegistration.update({
          where: { id: registration.id },
          data: {
            status: 'premium_pending'
          }
        });

        // Fire premium-pending tag if needed
        const webinarSlug = getWebinarSlug(webinarEvent.webinarId);
        await fireWebinarTag(
          `webinar-${webinarSlug}-premium-pending`,
          lead.email,
          lead.firstName,
          lead.lastName,
          lead.phone
        ).catch(err => {
          console.error('  ⚠️ Global Control tag failed (non-blocking):', err);
        });
      }

      return NextResponse.json({
        success: true,
        alreadyPremium: false,
        requiresPremium: true,
        skoolPlansUrl: webinarEvent.skoolPlansUrl,
        message: 'Premium membership required. Redirecting to SKOOL...'
      });
    }

  } catch (error) {
    console.error('❌ Error processing webinar registration:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: String(error)
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET(
  req: NextRequest,
  { params }: { params: { webinarId: string } }
) {
  const webinarEvent = await prisma.webinarEvent.findUnique({
    where: { webinarId: params.webinarId }
  });

  if (!webinarEvent) {
    return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
  }

  return NextResponse.json({
    webinarId: webinarEvent.webinarId,
    name: webinarEvent.name,
    startDateTime: webinarEvent.startDateTime,
    active: webinarEvent.active,
    qualificationMethod: webinarEvent.qualificationMethod
  });
}
