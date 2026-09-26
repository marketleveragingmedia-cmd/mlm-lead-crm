import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Find potential test leads
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { email: { contains: 'test' } },
          { email: { contains: 'demo' } },
          { skoolPlan: 'Premium' }
        ]
      },
      take: 10,
      orderBy: { updatedAt: 'desc' }
    });

    // Check for CFI-2026-10-08 registrations
    const registrations = await prisma.webinarRegistration.findMany({
      where: {
        webinarEvent: {
          webinarId: 'CFI-2026-10-08'
        }
      },
      include: {
        lead: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            skoolPlan: true
          }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      leads: leads.map((l: any) => ({
        email: l.email,
        plan: l.skoolPlan || 'None',
        name: `${l.firstName} ${l.lastName}`,
        id: l.id
      })),
      registrations: registrations.map((r: any) => ({
        email: r.lead.email,
        status: r.status,
        registrationStatus: r.registrationStatus || 'none',
        eligible: r.webinarEligible,
        createdAt: r.createdAt.toISOString()
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
