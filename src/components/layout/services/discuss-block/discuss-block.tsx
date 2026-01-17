'use client';

import { useState, useEffect } from 'react';
import { trackButtonClick } from '@/utils/analytics';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import './_services.scss';

// Social proof counter - generates realistic number
const getSocialProofCount = () => {
  const base = 47; // Base number
  const variation = Math.floor(Math.random() * 8); // Random 0-7
  return base + variation;
};

function DiscussBlock() {
  const locale = useLocale();
  const [socialProofCount, setSocialProofCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  // Animate social proof counter on mount
  useEffect(() => {
    const targetCount = getSocialProofCount();
    const duration = 2000; // 2 seconds
    const steps = 30;
    const increment = targetCount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.floor(increment * step), targetCount);
      setSocialProofCount(current);

      if (step >= steps) {
        clearInterval(timer);
        setSocialProofCount(targetCount);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Show discount badge on hover after 1 second
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setShowDiscount(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowDiscount(false);
    }
  }, [isHovered]);

  const handleDiscussClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Track marketing event
    trackButtonClick('discuss_project', 'discuss_block');

    window.location.href = addLocaleToPath('/schedule-call', locale);
  };

  return (
    <div className="discuss-block">
      <div className="container">
        <div
          className="info"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="info-content">
            <h3>{getTranslation(locale, 'discussBlock.title')}</h3>
            <div className="social-proof">
              <span className="social-proof-icon">👥</span>
              <span className="social-proof-text">
                <strong>{socialProofCount}+</strong>{' '}
                {getTranslation(locale, 'discussBlock.socialProof')}
              </span>
            </div>
            {showDiscount && (
              <div className="discount-badge">
                <span className="discount-icon">🎁</span>
                <span className="discount-text">
                  {getTranslation(locale, 'discussBlock.discountText')}
                </span>
              </div>
            )}
          </div>
          <a
            href="#"
            className={`btn mt-0! ${isHovered ? 'hovered' : ''}`}
            onClick={handleDiscussClick}
          >
            <span className="btn-text">
              {getTranslation(locale, 'discussBlock.buttonText')}
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
