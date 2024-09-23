import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const protectedRoutes = ['/init'];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!request.cookies.has('token')) {
      const redirectUrl = new URL('/sign-in', request.url);
      const originalPath = pathname + search;

      redirectUrl.searchParams.set('redirect', originalPath);

      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: ['/init/:path*', '/'],
};
