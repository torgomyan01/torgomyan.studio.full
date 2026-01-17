import { type Locale } from '@/i18n/config';
import { formatPrice } from '@/i18n/utils';

/**
 * Get formatted price for stats display based on locale
 * Prices are in rubles (base currency)
 */
export function getStatsPrice(amountInRubles: number, locale: Locale): string {
  return formatPrice(amountInRubles, locale);
}
