'use client';

import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_footer.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function Footer() {
  const locale = useLocale();

  return (
    <footer className="footer">
      <div className="container">
        <Link
          href={addLocaleToPath(SITE_URL.PRIVACY_POLICY, locale)}
          className="private-link"
        >
          {getTranslation(locale, 'common.privacyPolicy')}
        </Link>
        <Link
          href={addLocaleToPath(SITE_URL.HOME, locale)}
          className="footer-logo"
        >
          <img src="/images/logo.svg" alt="" />
        </Link>
        <p className="copyright">
          © {new Date().getFullYear()} {getTranslation(locale, 'common.allRightsReserved')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
