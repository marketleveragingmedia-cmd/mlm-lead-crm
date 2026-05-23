import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'changeme123';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === DASHBOARD_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set('mlm-crm-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
