'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { locales, localeNames, type Locale } from '@/i18n/config';
import {
  getLocaleFromPathname,
  addLocaleToPath,
  removeLocaleFromPath,
} from '@/i18n/utils';
import './_language-switcher.scss';

const flagImages: Record<Locale, string> = {
  hy: '/images/armenian-flag.svg',
  ru: '/images/flag-ru.svg',
  en: '/images/usa-flag5879.jpg',
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('ru');

  // Get the actual URL pathname from browser (not the rewritten one)
  useEffect(() => {
    const updateLocale = () => {
      const actualPathname = window.location.pathname;
      const locale = getLocaleFromPathname(actualPathname);
      setCurrentLocale(locale);
    };

    // Initial update
    updateLocale();

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', updateLocale);

    // Also check on focus (when user switches tabs back)
    window.addEventListener('focus', updateLocale);

    return () => {
      window.removeEventListener('popstate', updateLocale);
      window.removeEventListener('focus', updateLocale);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Get actual pathname from browser
    const actualPathname = window.location.pathname;
    const pathWithoutLocale = removeLocaleFromPath(actualPathname);
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale);

    // Set a cookie to indicate language switch (for middleware detection)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Use window.location.replace to avoid adding to history
    // This ensures middleware can properly detect the language switch
    window.location.replace(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <div className="language-switcher-flag">
          <Image
            src={flagImages[currentLocale]}
            alt={localeNames[currentLocale]}
            width={20}
            height={15}
            className="flag-icon"
            unoptimized
          />
        </div>
        <span className="language-switcher-current">
          {localeNames[currentLocale]}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`language-switcher-arrow ${isOpen ? 'open' : ''}`}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="language-switcher-dropdown">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`language-switcher-option ${
                locale === currentLocale ? 'active' : ''
              }`}
              onClick={() => handleLocaleChange(locale)}
            >
              <div className="language-switcher-flag">
                <Image
                  src={flagImages[locale]}
                  alt={localeNames[locale]}
                  width={20}
                  height={15}
                  className="flag-icon"
                  unoptimized
                />
              </div>
              <span className="language-switcher-text">
                {localeNames[locale]}
              </span>
              {locale === currentLocale && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="check-icon"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
