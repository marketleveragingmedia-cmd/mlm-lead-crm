import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find lead
    const lead = await prisma.lead.findUnique({
      where: { email: normalizedEmail }
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Update to Premium
    const updated = await prisma.lead.update({
      where: { id: lead.id },
      data: {
        skoolPlan: 'Premium'
      }
    });

    return NextResponse.json({
      success: true,
      email: updated.email,
      skoolPlan: updated.skoolPlan,
      message: 'Lead upgraded to Premium for testing'
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
