import { defaultLocale, locales, type Locale } from './config';
import hyTranslations from './translations/hy.json';
import ruTranslations from './translations/ru.json';
import enTranslations from './translations/en.json';

const translations = {
  hy: hyTranslations,
  ru: ruTranslations,
  en: enTranslations,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function getTranslation(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const t = getTranslations(locale);
  const keys = key.split('.');
  let value: any = t;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k as keyof typeof value];
    } else {
      return key; // Return key if translation not found
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Replace parameters in translation string
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return value;
}

export { locales, defaultLocale, type Locale };
