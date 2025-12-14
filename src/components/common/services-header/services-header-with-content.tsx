'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import './_info-block.scss';
import AiBlock from '@/components/common/ai-block/ai-block';

interface ServicesHeaderWithContentProps {
  title: string;
  description: string;
  structuredData?: object;
}

function ServicesHeaderWithContent({
  title,
  description,
  structuredData,
}: ServicesHeaderWithContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<HTMLDivElement>(null);

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

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Armenia',
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <header
      className="info-block"
      itemScope
      itemType="https://schema.org/Service"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />
      <div className="container">
        <div className="info">
          <h1 className="main-title" itemProp="name">
            {title}
          </h1>
          <h2 className="main-subtitle" itemProp="description">
            {description}
          </h2>
        </div>
        <AiBlock />
      </div>
    </header>
  );
}

export default ServicesHeaderWithContent;
