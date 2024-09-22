import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// TODO: 추후 dashboard 아닌 실제 라우터로 겨체
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!request.cookies.has('token')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
}

export const config = {
  // TODO: 추후 dashboard 아닌 실제 라우터로 겨체
  matcher: ['/dashboard/:path*', '/'],
};
