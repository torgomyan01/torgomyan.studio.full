import { type Locale, defaultLocale, isValidLocale } from './config';

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (isValidLocale(firstSegment)) {
    const remainingPath = segments.slice(1).join('/');
    return remainingPath ? `/${remainingPath}` : '/';
  }

  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  // Always remove existing locale first
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  // Don't add locale to root path if it's default locale
  if (pathWithoutLocale === '/' && locale === defaultLocale) {
    return '/';
  }

  // Add locale prefix
  return `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
}

export function removeLocaleFromPath(pathname: string): string {
  return getPathnameWithoutLocale(pathname);
}
