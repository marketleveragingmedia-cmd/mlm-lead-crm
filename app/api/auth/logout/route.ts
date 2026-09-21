import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  
  response.cookies.set('mlm-crm-auth', 'false', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0 // Delete cookie
  });

  return response;
}

export async function GET(request: NextRequest) {
  return POST(request);
}
