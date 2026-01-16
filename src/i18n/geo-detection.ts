import { type Locale, defaultLocale } from './config';
import { type NextRequest } from 'next/server';

/**
 * CIS (Commonwealth of Independent States) countries that primarily speak Russian
 */
const CIS_COUNTRIES = [
  'RU', // Russia
  'BY', // Belarus
  'KZ', // Kazakhstan
  'KG', // Kyrgyzstan
  'TJ', // Tajikistan
  'UZ', // Uzbekistan
  'AM', // Armenia (but we'll handle separately)
  'AZ', // Azerbaijan
  'GE', // Georgia
  'MD', // Moldova
  'UA', // Ukraine
];

/**
 * European countries
 */
const EUROPEAN_COUNTRIES = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
  'GB', // United Kingdom
  'NO', // Norway
  'CH', // Switzerland
  'IS', // Iceland
];

/**
 * American countries (North and South America)
 */
const AMERICAN_COUNTRIES = [
  'US', // United States
  'CA', // Canada
  'MX', // Mexico
  'BR', // Brazil
  'AR', // Argentina
  'CL', // Chile
  'CO', // Colombia
  'PE', // Peru
  'VE', // Venezuela
  'EC', // Ecuador
  'BO', // Bolivia
  'PY', // Paraguay
  'UY', // Uruguay
  'CR', // Costa Rica
  'PA', // Panama
  'GT', // Guatemala
  'HN', // Honduras
  'NI', // Nicaragua
  'SV', // El Salvador
  'DO', // Dominican Republic
  'CU', // Cuba
  'JM', // Jamaica
  'HT', // Haiti
  'TT', // Trinidad and Tobago
];

/**
 * Detect locale based on country code
 */
export function detectLocaleFromCountry(
  country: string | null | undefined
): Locale {
  if (!country) {
    return defaultLocale;
  }

  const countryCode = country.toUpperCase();

  // Armenia - always Armenian
  if (countryCode === 'AM') {
    return 'hy';
  }

  // CIS countries (except Armenia) - Russian
  if (CIS_COUNTRIES.includes(countryCode)) {
    return 'ru';
  }

  // European and American countries - English
  if (
    EUROPEAN_COUNTRIES.includes(countryCode) ||
    AMERICAN_COUNTRIES.includes(countryCode)
  ) {
    return 'en';
  }

  // Default to Russian for all other countries
  return defaultLocale;
}

/**
 * Get locale from request using geolocation
 * Supports Vercel's geo detection and fallback to IP-based detection
 */
export async function getLocaleFromGeo(request: NextRequest): Promise<Locale> {
  // Try Vercel's geo detection first (if available)
  // Note: request.geo is available in Vercel Edge Runtime
  const geo = (request as any).geo;
  if (geo?.country) {
    return detectLocaleFromCountry(geo.country);
  }

  // Fallback: Try to get country from CF-IPCountry header (Cloudflare)
  const cfCountry = request.headers.get('cf-ipcountry');
  if (cfCountry) {
    return detectLocaleFromCountry(cfCountry);
  }

  // Fallback: Try to get country from x-vercel-ip-country header (Vercel)
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return detectLocaleFromCountry(vercelCountry);
  }

  // If no geo information available, return default locale
  return defaultLocale;
}
