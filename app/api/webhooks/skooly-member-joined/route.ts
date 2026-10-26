// Skooly Member Joined Webhook Handler
// Created: October 26, 2026
// Enrolls new Standard SKOOL members in follow-up automation

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { enrollStandardMember, cancelStandardEmailsOnUpgrade } from '@/lib/standard-member-automation';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    console.log('[WEBHOOK] Skooly member event received:', payload);

    // Validate webhook signature (if Skooly provides one)
    // TODO: Add signature validation when Skooly supports it

    const { event, user, community, membership } = payload;

    // Handle member.joined event
    if (event === 'member.joined' || event === 'user.joined') {
      const email = user?.email || payload.email;
      const firstName = user?.firstName || user?.first_name || user?.name?.split(' ')[0];
      const lastName = user?.lastName || user?.last_name || user?.name?.split(' ').slice(1).join(' ');
      const skoolPlan = membership?.plan || membership?.tier || 'Standard';
      const joinedAt = new Date(user?.joinedAt || payload.timestamp || Date.now());

      if (!email) {
        return NextResponse.json({ error: 'Missing email in webhook payload' }, { status: 400 });
      }

      // Find or create lead record
      let lead = await prisma.lead.findUnique({ where: { email } });

      if (!lead) {
        lead = await prisma.lead.create({
          data: {
            email,
            firstName: firstName || 'Member',
            lastName: lastName || '',
            source: 'skool',
            skoolPlan: skoolPlan,
            skoolMembershipStartedAt: joinedAt,
          },
        });
      } else {
        // Update existing lead
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            skoolPlan: skoolPlan,
            skoolMembershipStartedAt: joinedAt,
            firstName: firstName || lead.firstName,
            lastName: lastName || lead.lastName,
          },
        });
      }

      // Enroll in Standard automation ONLY if Standard plan
      if (skoolPlan === 'Standard' || skoolPlan === 'Free') {
        const enrollmentResult = await enrollStandardMember(lead.id, joinedAt);

        console.log('[WEBHOOK] Enrollment result:', enrollmentResult);

        return NextResponse.json({
          success: true,
          message: 'Standard member enrolled in follow-up automation',
          enrollmentResult,
        });
      } else {
        console.log(`[WEBHOOK] Skipping Standard automation for ${skoolPlan} member`);
        return NextResponse.json({
          success: true,
          message: `Member is ${skoolPlan} - Standard automation not applicable`,
        });
      }
    }

    // Handle member.upgraded event
    if (event === 'member.upgraded' || event === 'user.upgraded') {
      const email = user?.email || payload.email;
      const newPlan = membership?.plan || membership?.tier || payload.plan;

      if (email && (newPlan === 'Premium' || newPlan === 'Paid')) {
        const lead = await prisma.lead.findUnique({ where: { email } });

        if (lead) {
          // Update plan
          await prisma.lead.update({
            where: { id: lead.id },
            data: { skoolPlan: newPlan },
          });

          // Cancel Standard emails
          await cancelStandardEmailsOnUpgrade(lead.id);

          console.log(`[WEBHOOK] Cancelled Standard emails for upgraded member: ${email}`);

          return NextResponse.json({
            success: true,
            message: 'Standard emails cancelled - member upgraded to Premium',
          });
        }
      }
    }

    // Unknown event type
    return NextResponse.json({
      success: true,
      message: 'Event received but not processed',
      event,
    });
  } catch (error: any) {
    console.error('[WEBHOOK] Error processing Skooly webhook:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown webhook processing error',
      },
      { status: 500 }
    );
  }
}
