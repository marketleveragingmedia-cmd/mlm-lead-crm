import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const sourcePage = searchParams.get('sourcePage');
    const limit = parseInt(searchParams.get('limit') || '100');

    const query = sourcePage ? { sourcePage } : {};
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

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
