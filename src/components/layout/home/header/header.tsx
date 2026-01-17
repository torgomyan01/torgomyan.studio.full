'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import './_info-block.scss';
import AiBlock from '@/components/common/ai-block/ai-block';
import { Works, SITE_URL } from '@/utils/consts';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);
  const displayedWorks = Works.slice(0, 10);
  const locale = useLocale();

  useEffect(() => {
    if (!swiperRef.current) {
      return;
    }

    const slider = new Swiper(swiperRef.current, {
      modules: [Navigation, Autoplay],
      slidesPerView: 2.1,
      spaceBetween: 20,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.1,
        },
        768: {
          slidesPerView: 2.1,
        },
      },
      on: {
        init: () => {
          setIsLoading(false);
        },
      },
    });

    return () => {
      slider.destroy(true, true);
    };
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % displayedWorks.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + displayedWorks.length) % displayedWorks.length
    );
  };

  // Structured data for SEO (JSON-LD)
  const baseUrl = 'https://torgomyan-studio.am';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: getTranslation(locale, 'home.title'),
    description: getTranslation(locale, 'home.subtitle').replace(
      /<[^>]*>/g,
      ''
    ),
    url: baseUrl,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <header
      className="info-block relative!"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container">
        <div className="info">
          <h1 className="main-title" itemProp="name">
            {getTranslation(locale, 'home.title')}
          </h1>
          <h2
            className="main-subtitle"
            itemProp="description"
            dangerouslySetInnerHTML={{
              __html: getTranslation(locale, 'home.subtitle'),
            }}
          />
          <div
            ref={swiperRef}
            className="info-slider swiper"
            role="region"
            aria-label={getTranslation(locale, 'common.gallery')}
          >
            {isLoading && (
              <div className="info-slider-loading" aria-hidden="true">
                <div
                  className="loading-spinner"
                  aria-label={getTranslation(locale, 'common.loading')}
                ></div>
              </div>
            )}
            <div
              className="swiper-wrapper"
              style={{ opacity: isLoading ? 0 : 1 }}
              aria-live="polite"
            >
              {displayedWorks.map((work, index) => (
                <div
                  key={work.name}
                  className="swiper-slide"
                  onClick={() => handleImageClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={`/${work.imgUrl}`}
                    alt={`${getTranslation(locale, 'ourWorks.workExample')} - ${work.name}`}
                    width={600}
                    height={170}
                    priority={index < 2}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fetchPriority={index < 2 ? 'high' : 'auto'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="header-actions">
            <Link
              href={addLocaleToPath('/schedule-call', locale)}
              className="schedule-call-header-btn"
            >
              <i className="fas fa-phone" aria-hidden="true"></i>
              <span>{getTranslation(locale, 'home.getConsultation')}</span>
            </Link>
            <Link
              href={addLocaleToPath(SITE_URL.CALCULATOR, locale)}
              className="calculator-header-btn"
            >
              <i className="fa-solid fa-calculator" aria-hidden="true"></i>
              <span>{getTranslation(locale, 'common.calculator')}</span>
            </Link>
          </div>
          <div className="header-contact-info">
            <a href="tel:+37477769668" className="phone-header-link">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <span>+374 77 76-96-68</span>
            </a>
            <a
              href="https://t.me/torgomyan01"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-header-link"
            >
              <i className="fab fa-telegram-plane" aria-hidden="true"></i>
              <span>@torgomyan01</span>
            </a>
          </div>
        </div>
        <AiBlock />
      </div>
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        works={displayedWorks}
        currentIndex={selectedImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </header>
  );
}

export default Header;
