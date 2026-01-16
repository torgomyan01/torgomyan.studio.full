'use client';

import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_contact-us.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function ContactUs() {
  const locale = useLocale();

  return (
    <div className="contact-us" id="contact">
      <div className="container">
        <h2 className="main-title">
          {getTranslation(locale, 'contact.title')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'contact.subtitle')}
        </p>
        <div className="buttons">
          <Link href={addLocaleToPath('/schedule-call', locale)}>
            {getTranslation(locale, 'contact.scheduleCall')}
            <img src="/images/link-arrow.svg" alt="" />
          </Link>
          <a href="tel:+37477769668">
            {getTranslation(locale, 'contact.call')}
            <img src="/images/link-arrow.svg" alt="" />
          </a>
        </div>

        <div className="contact-info">
          <div className="info">
            <p>
              <img src="/images/contact-icon1.svg" alt="" />
              {getTranslation(locale, 'contact.address')}
            </p>
            <a href="tel:+37477769668" className="text">
              <img src="/images/contact-icon2.svg" alt="" />
              +374 77 76-96-68
            </a>
            <a
              href="https://wa.me/37477769668"
              target="_blank"
              rel="noopener noreferrer"
              className="text"
            >
              <img src="/images/contact-icon3.svg" alt="" />
              +374 77 76-96-68
            </a>
            <a
              href="https://t.me/torgomyan01"
              target="_blank"
              rel="noopener noreferrer"
              className="text"
            >
              <img src="/images/contact-icon4.svg" alt="" />
              @torgomyan01
            </a>
            <Link
              href={addLocaleToPath(SITE_URL.CALCULATOR, locale)}
              className="btn cursor-pointer"
            >
              <i className="fa-solid fa-calculator mr-2"></i>
              <span>{getTranslation(locale, 'common.calculator')}</span>
            </Link>
          </div>
          <div id="map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Af026db7051cfc7952a3361c3d3bf24998f1427bd3b64e28673a2f5ade3b074ab&amp;source=constructor"
              width="821"
              height="500"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
