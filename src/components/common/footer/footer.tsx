'use client';

import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_footer.scss';
import PrimaryCtaLink from '@/components/common/primary-cta-link/primary-cta-link';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

const navLinks = [
  { key: 'common.services', href: SITE_URL.SERVICES },
  { key: 'common.portfolio', href: SITE_URL.OUR_WORKS },
  { key: 'common.calculator', href: SITE_URL.CALCULATOR },
  { key: 'common.contact', href: SITE_URL.CONTACT },
] as const;

function Footer() {
  const locale = useLocale();

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link
              href={addLocaleToPath(SITE_URL.HOME, locale)}
              className="footer__logo"
            >
              <img src="/images/logo.svg" alt="Torgomyan.Studio" />
            </Link>
            <p className="footer__tagline">
              {getTranslation(locale, 'footer.tagline')}
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <h3 className="footer__nav-title">
              {getTranslation(locale, 'footer.navigation')}
            </h3>
            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={addLocaleToPath(link.href, locale)}
                    className="footer__nav-link"
                  >
                    {getTranslation(locale, link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h3 className="footer__nav-title">
              {getTranslation(locale, 'footer.contact')}
            </h3>
            <ul className="footer__contact-list">
              <li>
                <a href="tel:+37477769668" className="footer__contact-link">
                  <i className="fas fa-phone" aria-hidden="true" />
                  +374 77 76-96-68
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/torgomyan01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-link"
                >
                  <i className="fab fa-telegram-plane" aria-hidden="true" />
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/37477769668"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-link"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__response">
            <i className="fas fa-clock" aria-hidden="true" />
            {getTranslation(locale, 'common.responseTime')}
          </p>
          <PrimaryCtaLink location="footer" size="md" />
          <Link
            href={addLocaleToPath(SITE_URL.PRIVACY_POLICY, locale)}
            className="footer__legal-link"
          >
            {getTranslation(locale, 'common.privacyPolicy')}
          </Link>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Torgomyan.Studio —{' '}
            {getTranslation(locale, 'common.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
