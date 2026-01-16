'use client';

import { SITE_URL } from '@/utils/consts';
import './_header.scss';

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/common/language-switcher/language-switcher';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function Navbar() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const locale = useLocale();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to restore overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`header ${isScrolled ? 'fixed' : ''}`}
        ref={containerRef}
      >
        <div className="container">
          <ul className={`main-menu ${isMenuOpen ? 'open' : ''}`}>
            <Link
              href={addLocaleToPath(SITE_URL.HOME, locale)}
              className="logo"
            >
              <img src="/images/logo.svg" alt="" />
            </Link>
            <li>
              <Link
                href={addLocaleToPath(SITE_URL.HOME, locale)}
                className="menu-link"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'common.about') || 'О Нас'}
              </Link>
            </li>
            <li>
              <Link
                href={addLocaleToPath(SITE_URL.SERVICES, locale)}
                className="menu-link"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'common.services')}
              </Link>
            </li>

            <li>
              <Link
                href={addLocaleToPath(SITE_URL.OUR_WORKS, locale)}
                className="menu-link"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'common.portfolio')}
              </Link>
            </li>
            <li>
              <Link
                href={addLocaleToPath(SITE_URL.CONTACT, locale)}
                className="menu-link"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'common.contact')}
              </Link>
            </li>
          </ul>

          <div
            className={`drop-menu ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </header>
      <LanguageSwitcher />
    </>
  );
}

export default Navbar;
