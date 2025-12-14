'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import './_info-block.scss';
import AiBlock from '@/components/common/ai-block/ai-block';

function ServicesHeader() {
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
      className="info-block"
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
            Интернет-магазин
          </h1>
          <h2 className="main-subtitle" itemProp="description">
            Давно выяснено, что при оценке дизайна и композиции читаемый текст
            мешает сосредоточиться. Lorem Ipsum используют потому, что тот
            обеспечивает более или менее стандартное заполнение шаблона, а также
            реальное распределение букв и пробелов в абзацах, которое не
            получается при простой дубликации "Здесь ваш текст.. Здесь ваш
            текст.. Здесь ваш текст.." Многие программы электронной вёрстки и
            редакторы HTML используют Lorem Ipsum в качестве текста по
            умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
            показывает, как много веб-страниц всё ещё дожидаются своего
            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
            много версий. Некоторые версии появились по ошибке, некоторые -
            намеренно (например, юмористические варианты).
          </h2>
        </div>
        <AiBlock />
      </div>
    </header>
  );
}

export default ServicesHeader;
