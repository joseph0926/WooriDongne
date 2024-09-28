import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify, errors } from 'jose';

const protectedRoutes = ['/init'];
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 이미 로그인된 사용자가 다시 로그인 페이지로 가지 않도록 처리
  if (pathname.startsWith('/sign-in') && request.cookies.has('token')) {
    const token = request.cookies.get('token')?.value;

    try {
      await jwtVerify(token as string, JWT_SECRET);
      // 이미 로그인된 상태이면 홈으로 리다이렉트
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    } catch (err) {
      // 토큰이 유효하지 않으면 로그아웃된 상태로 로그인 페이지 유지
      handleTokenError(err, request.url);
    }
  }

  // 보호된 경로에 접근하는 경우
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    // 토큰이 없는 경우 로그인 페이지로 리다이렉트
    if (!token) {
      const redirectUrl = new URL('/sign-in', request.url);
      const originalPath = pathname + search;
      redirectUrl.searchParams.set('redirect', originalPath);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      // 토큰이 유효한지 검증
      await jwtVerify(token as string, JWT_SECRET);
    } catch (err) {
      // 유효하지 않은 토큰일 경우 로그인 페이지로 리다이렉트
      handleTokenError(err, request.url);

      const redirectUrl = new URL('/sign-in', request.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 기본적으로 요청을 계속 처리
  return NextResponse.next();
}

function handleTokenError(err: unknown, url: string) {
  if (err instanceof errors.JWSInvalid) {
    console.error(`JWT Error on route ${url}:`, err.message);
  } else {
    console.error(`Unexpected error on route ${url}:`, err);
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
