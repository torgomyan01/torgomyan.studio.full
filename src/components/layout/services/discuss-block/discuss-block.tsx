'use client';

import { trackButtonClick } from '@/utils/analytics';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import { SITE_URL } from '@/utils/consts';
import './_services.scss';

function DiscussBlock() {
  const locale = useLocale();

  const handleDiscussClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackButtonClick('discuss_project', 'discuss_block');
    window.location.href = addLocaleToPath(SITE_URL.CALCULATOR, locale);
  };

  return (
    <div className="discuss-block">
      <div className="container">
        <div className="info">
          <div className="info-content">
            <span className="discuss-badge">
              {getTranslation(locale, 'discussBlock.badge')}
            </span>
            <h3>{getTranslation(locale, 'discussBlock.title')}</h3>
            <p className="discuss-subtitle">
              {getTranslation(locale, 'discussBlock.subtitle')}
            </p>
          </div>
          <a href="#" className="btn mt-0!" onClick={handleDiscussClick}>
            <span className="btn-text">
              {getTranslation(locale, 'common.primaryCta')}
            </span>
            <span className="btn-arrow">
              <img src="/images/link-arrow.svg" alt="" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DiscussBlock;
