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

  // Don't add locale prefix if it's default locale (for all paths, not just root)
  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }

  // Add locale prefix for non-default locales
  return `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
}

export function removeLocaleFromPath(pathname: string): string {
  return getPathnameWithoutLocale(pathname);
}

/**
 * Get currency symbol for a locale
 * @param locale - The locale
 * @returns Currency symbol (₽ for ru, $ for en, ֏ for hy)
 */
export function getCurrencySymbol(locale: Locale): string {
  switch (locale) {
    case 'ru':
      return '₽';
    case 'en':
      return '$';
    case 'hy':
      return '֏';
    default:
      return '₽';
  }
}

/**
 * Convert a RUB amount to the locale currency (approximate rates).
 * ru → RUB, en → USD, hy → AMD
 */
export function convertFromRub(amountInRub: number, locale: Locale): number {
  if (locale === 'en') {
    return Math.round(amountInRub / 90);
  }
  if (locale === 'hy') {
    const amd = amountInRub * 4.3;
    if (amd < 1000) return Math.round(amd / 50) * 50;
    if (amd < 10000) return Math.round(amd / 100) * 100;
    return Math.round(amd / 1000) * 1000;
  }
  return Math.round(amountInRub);
}

/**
 * Format price with currency symbol based on locale
 * @param amount - The amount in base currency (rubles)
 * @param locale - The locale
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(amount: number, locale: Locale): string {
  const convertedAmount = convertFromRub(amount, locale);
  const formatted = convertedAmount.toLocaleString(
    locale === 'ru' ? 'ru-RU' : locale === 'hy' ? 'hy-AM' : 'en-US'
  );
  const symbol = getCurrencySymbol(locale);

  if (locale === 'en') {
    return `${symbol}${formatted}`;
  }

  return `${formatted} ${symbol}`;
}