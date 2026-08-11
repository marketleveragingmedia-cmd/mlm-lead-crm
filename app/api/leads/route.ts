import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sourcePage = searchParams.get('sourcePage');
    const limit = parseInt(searchParams.get('limit') || '100');

    const leads = await prisma.lead.findMany({
      where: sourcePage ? { sourcePage } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads
    });

  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
