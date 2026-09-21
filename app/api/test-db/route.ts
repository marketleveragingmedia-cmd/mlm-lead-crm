import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const count = await prisma.lead.count();
    return NextResponse.json({
      success: true,
      count,
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      database: 'failed'
    }, { status: 500 });
  }
}
