'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import './_info-block.scss';
import AiBlock from '@/components/common/ai-block/ai-block';
import { Works } from '@/utils/consts';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);
  const displayedWorks = Works.slice(0, 10);

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

  // Structured data for SEO (JSON-LD) - оптимизировано для Yandex и Google
  // Using static URL to prevent hydration mismatch
  const baseUrl = 'https://torgomyan.studio';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Создаем сайты для вашего бизнеса',
    description:
      'Профессиональная разработка сайтов для бизнеса. Работать с нами, вы получите рост бизнеса до 30%.',
    url: baseUrl,
    inLanguage: 'ru',
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
            Создаем сайты для вашего бизнеса
          </h1>
          <h2 className="main-subtitle" itemProp="description">
            Работать с нами, вы получите рост бизнеса до <strong>30%</strong>.
          </h2>
          <div
            ref={swiperRef}
            className="info-slider swiper"
            role="region"
            aria-label="Галерея примеров работ"
          >
            {isLoading && (
              <div className="info-slider-loading" aria-hidden="true">
                <div className="loading-spinner" aria-label="Загрузка"></div>
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
                    alt={`Пример работы - ${work.name}`}
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
