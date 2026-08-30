import { NextResponse, type NextRequest } from 'next/server';
import * as UAParser from 'ua-parser-js';
import {
  defaultLocale,
  isValidLocale,
  type Locale,
} from '@/i18n/config';
import { addLocaleToPath } from '@/i18n/utils';
import { getLocaleFromGeo } from '@/i18n/geo-detection';

function createLocaleHeaders(
  request: NextRequest,
  locale: Locale,
  pathname: string,
  actualPathname: string
): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-actual-pathname', actualPathname);
  return requestHeaders;
}

function attachLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next();
  }

  const hasLocale = isValidLocale(firstSegment);
  let locale: Locale = hasLocale ? firstSegment : defaultLocale;
  let actualPathname = pathname;

  if (!hasLocale) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && isValidLocale(cookieLocale)) {
      locale = cookieLocale as Locale;
    } else {
      const referer = request.headers.get('referer');
      const isLanguageSwitch =
        referer &&
        (referer.includes('/en/') ||
          referer.includes('/ru/') ||
          referer.includes('/hy/') ||
          referer.endsWith('/en') ||
          referer.endsWith('/ru') ||
          referer.endsWith('/hy'));

      const isSwitchingToDefault =
        referer &&
        (referer.includes('/en/') ||
          referer.includes('/hy/') ||
          referer.endsWith('/en') ||
          referer.endsWith('/hy'));

      if (isLanguageSwitch || isSwitchingToDefault) {
        locale = defaultLocale;
      } else {
        locale = await getLocaleFromGeo(request);
      }
    }
  }

  if (hasLocale) {
    const remainingPath = pathnameSegments.slice(1).join('/');
    actualPathname = remainingPath ? `/${remainingPath}` : '/';

    const url = request.nextUrl.clone();
    url.pathname = actualPathname;

    const response = NextResponse.rewrite(url, {
      request: {
        headers: createLocaleHeaders(
          request,
          locale,
          pathname,
          actualPathname
        ),
      },
    });

    return attachLocaleCookie(response, locale);
  }

  if (!hasLocale && locale !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = addLocaleToPath(pathname, locale);
    const redirectResponse = NextResponse.redirect(url);
    return attachLocaleCookie(redirectResponse, locale);
  }

  const userAgent = request.headers.get('user-agent');

  if (userAgent) {
    const parser = UAParser.UAParser(userAgent);
    const device = parser.device;

    if (
      (device.type === 'mobile' || device.type === 'tablet') &&
      pathname === '/account'
    ) {
      return NextResponse.redirect(new URL('/account-menu', request.url));
    }
  }

  const response = NextResponse.next({
    request: {
      headers: createLocaleHeaders(
        request,
        locale,
        pathname,
        actualPathname || pathname
      ),
    },
  });

  return attachLocaleCookie(response, locale);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'experimental-edge',
};
