import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Karpan Admin"' }
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes('/admin/stats') || pathname.startsWith('/api/admin/')) {
    const auth = request.headers.get('authorization');
    if (!auth?.startsWith('Basic ')) return unauthorized();

    const raw = auth.split(' ')[1];
    const decoded = Buffer.from(raw, 'base64').toString();
    const [user, pass] = decoded.split(':');

    if (user !== process.env.ADMIN_BASIC_USER || pass !== process.env.ADMIN_BASIC_PASS) {
      return unauthorized();
    }
  }

  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (pathnameHasLocale || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
