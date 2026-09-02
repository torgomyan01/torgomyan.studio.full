'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import './_info-block.scss';
import AiBlock from '@/components/common/ai-block/ai-block';
import JsonLd from '@/components/common/structured-data/json-ld';
import { useLocale } from '@/i18n/use-locale';
import {
  buildLocalizedUrl,
  buildServiceSchema,
} from '@/utils/seo';
import { getPathnameWithoutLocale } from '@/i18n/utils';

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
  const locale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

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

  const defaultStructuredData = buildServiceSchema({
    name: title,
    description,
    url: buildLocalizedUrl(pathWithoutLocale, locale),
    locale,
  });

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <header className="info-block">
      <JsonLd data={finalStructuredData as Record<string, unknown>} />
      <div className="container">
        <div className="info">
          <h1 className="main-title">{title}</h1>
          <p className="main-subtitle">{description}</p>
        </div>
        <AiBlock />
      </div>
    </header>
  );
}

export default ServicesHeaderWithContent;
