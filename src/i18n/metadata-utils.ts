import { headers } from 'next/headers';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { getLocaleFromHeaders } from '@/i18n/server-utils';

export async function getPagePathContext(fallbackPath: string) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || fallbackPath;
  const locale = await getLocaleFromHeaders();
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  return { locale, pathWithoutLocale };
}
