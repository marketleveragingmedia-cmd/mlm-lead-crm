import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for /crm routes (but not API routes)
  if (request.nextUrl.pathname.startsWith('/crm') && !request.nextUrl.pathname.startsWith('/crm/api')) {
    const authCookie = request.cookies.get('mlm-crm-auth');
    
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/crm/:path*',
};
