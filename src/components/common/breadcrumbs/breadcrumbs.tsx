'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './_breadcrumbs.scss';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Главная',
  '/services': 'Услуги',
  '/services/website-development': 'Разработка сайтов',
  '/services/landing-page': 'Лендинг-страница',
  '/services/business-card-website': 'Сайт-визитка',
  '/services/corporate-website': 'Корпоративный сайт',
  '/services/online-shop': 'Интернет-магазин',
  '/services/web-applications': 'Веб-приложения',
  '/services/seo': 'SEO продвижение',
  '/services/ui-ux-design': 'UI/UX дизайн',
  '/services/technical-support': 'Техническая поддержка',
  '/services/hosting-domains': 'Хостинг и домены',
  '/services/payment-integration': 'Интеграция платежей',
  '/services/business-automation': 'Автоматизация бизнеса',
  '/our-works': 'Наши работы',
  '/blog': 'Блог',
  '/privacy-policy': 'Политика конфиденциальности',
};

const blogArticleLabels: Record<string, string> = {
  'kak-vybrat-veb-studiyu': 'Как выбрать веб-студию',
  '10-oshibok-pri-sozdanii-sajta': '10 ошибок при создании сайта',
  'seo-optimizaciya-sajta': 'SEO-оптимизация сайта',
  'kak-sozdat-uspeshnyj-lending': 'Как создать успешный лендинг',
  'kak-vybrat-cms': 'Как выбрать CMS',
  'optimizaciya-skorosti-sajta': 'Оптимизация скорости сайта',
  'trendy-veb-dizajna': 'Тренды веб-дизайна 2024',
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: 'Главная', href: '/' }];

    const segments = pathname.split('/').filter(Boolean);

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Check if it's a blog article
      if (currentPath.startsWith('/blog/') && index === segments.length - 1) {
        const articleSlug = segment;
        const articleLabel = blogArticleLabels[articleSlug] || segment;
        items.push({
          label: articleLabel,
          href: currentPath,
        });
      } else {
        const label = routeLabels[currentPath] || segment;
        items.push({
          label: label,
          href: currentPath,
        });
      }
    });

    return items;
  };

  const breadcrumbs = generateBreadcrumbs();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://torgomyan.studio${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <div className="container">
          <ol className="breadcrumbs-list">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={item.href} className="breadcrumbs-item">
                  {isLast ? (
                    <span className="breadcrumbs-current" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link href={item.href} className="breadcrumbs-link">
                        {item.label}
                      </Link>
                      <span className="breadcrumbs-separator">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
