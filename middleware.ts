import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Handle masterclass subdomain
  if (hostname === 'masterclass.cashflowvisionaries.com') {
    const url = request.nextUrl.clone();
    
    // If requesting root, rewrite to /cash-flow-injection-masterclass
    if (url.pathname === '/') {
      url.pathname = '/cash-flow-injection-masterclass';
      return NextResponse.rewrite(url);
    }
    
    return NextResponse.next();
  }
  
  // Handle foundation-for-success subdomain
  if (hostname === 'foundation-for-success.cashflowvisionaries.com') {
    const url = request.nextUrl.clone();
    
    // If requesting root, rewrite to /v19
    if (url.pathname === '/') {
      url.pathname = '/v19';
      return NextResponse.rewrite(url);
    }
    
    // If requesting any other path, preserve it (allows /v19/assets, etc.)
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
