import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname.startsWith('/api/capture-lead') ||
    pathname.startsWith('/api/test-env') ||
    pathname.startsWith('/api/debug-last-lead') ||
    pathname.startsWith('/api/search-lead') ||
    pathname.startsWith('/api/auth/login') ||
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Check authentication
  const authCookie = request.cookies.get('mlm-crm-auth');

  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
