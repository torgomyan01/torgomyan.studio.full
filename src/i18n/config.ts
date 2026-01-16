export const locales = ['hy', 'ru', 'en'] as const;
export const defaultLocale = 'ru' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  hy: 'Հայերեն',
  ru: 'Русский',
  en: 'English',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
