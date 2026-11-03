// Webinar Qualification Service
// Handles Premium qualification and WebinarJam registration triggering

import { prisma } from './prisma';
import { registerWithWebinarJam } from './webinarjam-registration';

export async function qualifyPendingWebinarRegistrations(
  leadId: string,
  isPremium: boolean,
  isFoundationPurchaser: boolean = false
): Promise<void> {
  // Check if lead qualifies via Premium OR Foundation Experience
  const isQualified = isPremium || isFoundationPurchaser;
  
  if (!isQualified) {
    console.log('  ⏭️  Not qualified (Premium or Foundation required), skipping webinar qualification');
    return;
  }

  const qualificationReason = isPremium ? 'Premium Member' : 'Foundation Experience Purchaser';
  console.log(`  🎯 Qualified (${qualificationReason}) - checking pending webinar registrations`);

  // Find all pending webinar registrations for this lead
  // that require Premium OR Foundation qualification
  const pendingRegistrations = await prisma.webinarRegistration.findMany({
    where: {
      leadId,
      qualificationMethod: 'skool_premium', // Both Premium and Foundation qualify for this
      webinarEligible: false,
      registrationStatus: 'pending'
    },
    include: {
      lead: true,
      webinarEvent: true
    }
  });

  if (pendingRegistrations.length === 0) {
    console.log('  ℹ️  No pending webinar registrations requiring Premium');
    return;
  }

  console.log(`  📋 Found ${pendingRegistrations.length} pending registration(s)`);

  // Qualify and register each one
  for (const registration of pendingRegistrations) {
    try {
      console.log(`  🎫 Processing: ${registration.webinarEvent.name}`);

      // Mark as eligible
      await prisma.webinarRegistration.update({
        where: { id: registration.id },
        data: {
          webinarEligible: true,
          webinarEligibleSince: new Date(),
          qualifiedAt: new Date(),
          status: 'qualified'
        }
      });

      console.log('  ✅ Marked as eligible');

      // Trigger WebinarJam registration
      await registerWithWebinarJam(registration.lead, registration);

      console.log('  ✅ WebinarJam registration triggered');

    } catch (error) {
      console.error(`  ❌ Error processing registration ${registration.id}:`, error);
      // Continue with next registration even if one fails
    }
  }
}
