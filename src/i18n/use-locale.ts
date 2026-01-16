'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from './utils';
import { type Locale } from './config';

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname);
}
