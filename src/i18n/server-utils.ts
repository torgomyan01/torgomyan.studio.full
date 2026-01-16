import { headers } from 'next/headers';
import { type Locale, isValidLocale } from './config';
import { getLocaleFromPathname } from './utils';

/**
 * Server-only utility to get locale from headers
 * This can only be used in Server Components
 */
export async function getLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();
  const locale = headersList.get('x-locale');
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  const pathname = headersList.get('x-pathname') || '/';
  return getLocaleFromPathname(pathname);
}
