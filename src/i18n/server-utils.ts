import { cookies, headers } from 'next/headers';
import { type Locale, isValidLocale, defaultLocale } from './config';
import { getLocaleFromPathname } from './utils';

/**
 * Server-only utility to get locale from headers / cookie / pathname.
 * Must be used in Server Components and generateMetadata.
 */
export async function getLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();

  const localeHeader = headersList.get('x-locale');
  if (localeHeader && isValidLocale(localeHeader)) {
    return localeHeader;
  }

  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('x-actual-pathname') ||
    '/';
  const fromPath = getLocaleFromPathname(pathname);
  if (fromPath && fromPath !== defaultLocale) {
    return fromPath;
  }

  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
    if (cookieLocale && isValidLocale(cookieLocale)) {
      return cookieLocale;
    }
  } catch {
    // cookies() can throw outside of a request context
  }

  return fromPath || defaultLocale;
}
