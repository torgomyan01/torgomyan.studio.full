'use client';

import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import { trackButtonClick } from '@/utils/analytics';

interface PrimaryCtaLinkProps {
  className?: string;
  location?: string;
  variant?: 'primary' | 'white' | 'ghost';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

export default function PrimaryCtaLink({
  className = '',
  location,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
}: PrimaryCtaLinkProps) {
  const locale = useLocale();

  return (
    <Link
      href={addLocaleToPath(SITE_URL.CALCULATOR, locale)}
      className={[
        'studio-btn',
        `studio-btn--${variant}`,
        size === 'lg' ? 'studio-btn--lg' : '',
        fullWidth ? 'studio-btn--full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        if (location) {
          trackButtonClick('primary_cta', location);
        }
      }}
    >
      <i className="fas fa-calculator" aria-hidden="true" />
      {getTranslation(locale, 'common.primaryCta')}
    </Link>
  );
}
