'use client';

import { useState, useEffect } from 'react';
import { trackButtonClick } from '@/utils/analytics';
import './_services.scss';

// Social proof counter - generates realistic number
const getSocialProofCount = () => {
  const base = 47; // Base number
  const variation = Math.floor(Math.random() * 8); // Random 0-7
  return base + variation;
};

function DiscussBlock() {
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

    window.location.href = '/schedule-call';
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
            <h3>Вам нужен также такие сайты ?</h3>
            <div className="social-proof">
              <span className="social-proof-icon">👥</span>
              <span className="social-proof-text">
                <strong>{socialProofCount}+</strong> клиентов обратились в этом
                месяце
              </span>
            </div>
            {showDiscount && (
              <div className="discount-badge">
                <span className="discount-icon">🎁</span>
                <span className="discount-text">
                  Бесплатная консультация + смета проекта
                </span>
              </div>
            )}
          </div>
          <a
            href="#"
            className={`btn mt-0! ${isHovered ? 'hovered' : ''}`}
            onClick={handleDiscussClick}
          >
            <span className="btn-text">Давайте обсудим</span>
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
