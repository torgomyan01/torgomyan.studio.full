'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './_breadcrumbs.scss';
import { Works } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath, getPathnameWithoutLocale } from '@/i18n/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const locale = useLocale();
  const [pathname, setPathname] = useState<string>('/');

  // Get actual pathname from browser (not the rewritten one)
  useEffect(() => {
    const updatePathname = () => {
      setPathname(window.location.pathname);
    };

    // Initial update
    updatePathname();

    // Listen for navigation changes
    window.addEventListener('popstate', updatePathname);
    window.addEventListener('focus', updatePathname);

    return () => {
      window.removeEventListener('popstate', updatePathname);
      window.removeEventListener('focus', updatePathname);
    };
  }, []);

  // Don't show breadcrumbs on home page
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);
  if (pathWithoutLocale === '/') {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: getTranslation(locale, 'breadcrumbs.home'),
        href: addLocaleToPath('/', locale),
      },
    ];

    const segments = pathWithoutLocale.split('/').filter(Boolean);

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      if (
        currentPath.startsWith('/our-works/') &&
        index === segments.length - 1
      ) {
        // Check if it's a project detail page
        const projectSlug = segment;
        const project = Works.find((w) => w.slug === projectSlug);
        const projectLabel = project ? project.name : segment;
        items.push({
          label: projectLabel,
          href: addLocaleToPath(currentPath, locale),
        });
      } else {
        const routeKey = `breadcrumbs.routes.${currentPath}`;
        const label =
          getTranslation(locale, routeKey) !== routeKey
            ? getTranslation(locale, routeKey)
            : segment;
        items.push({
          label: label,
          href: addLocaleToPath(currentPath, locale),
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
      item: `https://torgomyan-studio.am${item.href}`,
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
