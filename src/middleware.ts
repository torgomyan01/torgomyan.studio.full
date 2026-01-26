import { withAuth } from 'next-auth/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import * as UAParser from 'ua-parser-js';
import {
  locales,
  defaultLocale,
  isValidLocale,
  type Locale,
} from '@/i18n/config';
import { getLocaleFromPathname, addLocaleToPath } from '@/i18n/utils';
import { getLocaleFromGeo } from '@/i18n/geo-detection';

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameSegments = pathname.split('/').filter(Boolean);
    const firstSegment = pathnameSegments[0];

    // Skip i18n handling for static files, API routes, and admin routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/robots.txt') ||
      pathname.startsWith('/sitemap')
    ) {
      // Handle admin routes
      if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') {
          return NextResponse.next();
        }
        return NextResponse.next();
      }
      return NextResponse.next();
    }

    // Check if pathname already has a locale
    const hasLocale = isValidLocale(firstSegment);
    let locale: Locale = hasLocale ? firstSegment : defaultLocale;
    let actualPathname = pathname;

    // Detect locale based on geolocation if no locale in URL
    if (!hasLocale) {
      // Check if user has explicitly set a locale preference via cookie
      const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
      if (cookieLocale && isValidLocale(cookieLocale)) {
        locale = cookieLocale as Locale;
        // If switching to default locale, don't add prefix
        if (locale === defaultLocale) {
          // Keep default locale without prefix
        } else {
          // For non-default locales, redirect will happen below
        }
      } else {
        // Check if user is switching language (coming from a locale-prefixed URL)
        const referer = request.headers.get('referer');
        const isLanguageSwitch =
          referer &&
          (referer.includes('/en/') ||
            referer.includes('/ru/') ||
            referer.includes('/hy/') ||
            referer.endsWith('/en') ||
            referer.endsWith('/ru') ||
            referer.endsWith('/hy'));

        // Also check if user is switching TO default locale (ru)
        // by checking if referer has a different locale prefix
        const isSwitchingToDefault =
          referer &&
          (referer.includes('/en/') ||
            referer.includes('/hy/') ||
            referer.endsWith('/en') ||
            referer.endsWith('/hy'));

        if (isLanguageSwitch || isSwitchingToDefault) {
          // User explicitly switched language - respect their choice
          // If they're switching to default locale (ru), use default locale (no prefix)
          locale = defaultLocale;
        } else {
          // First visit: detect locale from geolocation
          locale = await getLocaleFromGeo(request);
        }
      }
    }

    // If locale is in URL, rewrite to internal path without locale
    if (hasLocale) {
      const remainingPath = pathnameSegments.slice(1).join('/');
      actualPathname = remainingPath ? `/${remainingPath}` : '/';

      // Rewrite the URL to the actual path without locale
      const url = request.nextUrl.clone();
      url.pathname = actualPathname;
      const response = NextResponse.rewrite(url);
      response.headers.set('x-locale', locale);
      response.headers.set('x-pathname', pathname);
      response.headers.set('x-actual-pathname', actualPathname);
      
      // Set cookie to remember user's locale preference
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
      });
      
      return response;
    }

    // If no locale in URL and locale is not default, redirect to include locale
    if (!hasLocale && locale !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = addLocaleToPath(pathname, locale);
      const redirectResponse = NextResponse.redirect(url);
      
      // Set cookie to remember user's locale preference
      redirectResponse.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
      });
      
      return redirectResponse;
    }

    // Handle regular user routes with NextAuth
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

    // Add locale to headers for use in server components
    const response = NextResponse.next();
    response.headers.set('x-locale', locale);
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-actual-pathname', actualPathname || pathname);
    
    // Set cookie to remember user's locale preference (for default locale too)
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 31536000, // 1 year
      sameSite: 'lax',
    });

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl.pathname;

        // Admin routes require admin token
        if (url.startsWith('/admin') && url !== '/admin/login') {
          if (!token) {
            return false;
          }
          const user = token as any;
          return (
            user.type === 'admin' ||
            user.role === 'admin' ||
            (Array.isArray(user.role) &&
              user.role.some((r: string) =>
                String(r).toLowerCase().includes('admin')
              ))
          );
        }

        // Regular user routes are public - allow access without authentication
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

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
  runtime: 'experimental-edge', // Use Edge Runtime for geolocation support
};
