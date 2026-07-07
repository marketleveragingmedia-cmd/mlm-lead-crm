import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hasAdminEmail: !!process.env.ADMIN_NOTIFICATION_EMAIL,
    adminEmailLength: process.env.ADMIN_NOTIFICATION_EMAIL?.length || 0,
    hasResendKey: !!process.env.RESEND_API_KEY,
    nodeEnv: process.env.NODE_ENV
  });
}
