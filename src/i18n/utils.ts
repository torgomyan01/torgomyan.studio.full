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
 * Format price with currency symbol based on locale
 * @param amount - The amount in base currency (rubles)
 * @param locale - The locale
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(amount: number, locale: Locale): string {
  // Convert rubles to other currencies (approximate rates)
  let convertedAmount = amount;
  
  if (locale === 'en') {
    // 1 USD ≈ 100 RUB (approximate)
    convertedAmount = Math.round(amount / 100);
  } else if (locale === 'hy') {
    // 1 AMD ≈ 0.25 RUB or 400 AMD ≈ 100 RUB (approximate)
    convertedAmount = Math.round(amount * 4);
  }
  
  const formatted = convertedAmount.toLocaleString(
    locale === 'ru' ? 'ru-RU' : locale === 'hy' ? 'hy-AM' : 'en-US'
  );
  
  return `${formatted}${getCurrencySymbol(locale)}`;
}