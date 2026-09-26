// WebinarJam Registration Service
// Handles programmatic registration via WebinarJam API

import { prisma } from './prisma';
import { enqueueTag } from './global-control-outbox';
import { getWebinarSlug } from './webinar-config';

const WEBINARJAM_API_KEY = process.env.WEBINARJAM_API_KEY;
const WEBINARJAM_API_BASE = 'https://api.webinarjam.com/webinarjam';

interface WebinarJamRegistrationResponse {
  status: string;
  user?: {
    user_id: number;
    webinar_id: number;
    webinar_hash: string;
    first_name: string;
    last_name: string;
    email: string;
    schedule: string | number;
    date: string;
    timezone: string;
    live_room_url: string;
    replay_room_url: string;
    thank_you_url: string;
  };
  message?: string;
  errors?: any;
}

export async function registerWithWebinarJam(
  lead: any,
  registration: any
): Promise<boolean> {
  try {
    if (!WEBINARJAM_API_KEY) {
      throw new Error('WEBINARJAM_API_KEY not configured');
    }

    console.log(`  📡 Registering with WebinarJam: ${lead.email}`);

    // Increment attempt counter
    await prisma.webinarRegistration.update({
      where: { id: registration.id },
      data: {
        registrationAttempts: { increment: 1 },
        lastAttemptAt: new Date()
      }
    });

    // Call WebinarJam API
    const response = await fetch(`${WEBINARJAM_API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: WEBINARJAM_API_KEY,
        webinar_id: String(registration.webinarEvent.webinarJamWebinarId),
        schedule: String(registration.webinarEvent.webinarJamScheduleId),
        first_name: lead.firstName,
        last_name: lead.lastName,
        email: lead.email,
        phone: lead.phone || undefined
      })
    });

    const data: WebinarJamRegistrationResponse = await response.json();

    if (data.status === 'success' && data.user) {
      console.log(`  ✅ WebinarJam registration successful: user_id ${data.user.user_id}`);

      // Update registration record
      await prisma.webinarRegistration.update({
        where: { id: registration.id },
        data: {
          webinarJamRegistrantId: String(data.user.user_id),
          webinarJamLiveRoomUrl: data.user.live_room_url,
          webinarJamReplayRoomUrl: data.user.replay_room_url,
          registrationStatus: 'registered',
          registeredAt: new Date(),
          status: 'registered'
        }
      });

      // Enqueue Global Control tag (durable delivery)
      const webinarSlug = getWebinarSlug(registration.webinarEvent.webinarId);
      await enqueueTag(
        `webinar-${webinarSlug}-registered`,
        lead.email,
        lead.firstName,
        lead.lastName,
        lead.phone
      );

      return true;

    } else {
      // Registration failed
      const errorMessage = data.message || JSON.stringify(data.errors || data);
      console.error(`  ❌ WebinarJam registration failed:`, errorMessage);

      await prisma.webinarRegistration.update({
        where: { id: registration.id },
        data: {
          registrationStatus: 'failed',
          registrationError: errorMessage
        }
      });

      return false;
    }

  } catch (error) {
    console.error(`  ❌ Error calling WebinarJam API:`, error);

    // Store error
    await prisma.webinarRegistration.update({
      where: { id: registration.id },
      data: {
        registrationStatus: 'failed',
        registrationError: String(error)
      }
    });

    return false;
  }
}
