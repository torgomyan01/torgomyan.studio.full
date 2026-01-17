'use client';

import { SITE_URL } from '@/utils/consts';
import './_header.scss';

import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/common/language-switcher/language-switcher';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath, getPathnameWithoutLocale } from '@/i18n/utils';

function Navbar() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const locale = useLocale();
  const pathname = usePathname();

  // Get current path without locale for active link detection
  const currentPath = getPathnameWithoutLocale(pathname);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
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

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      href: SITE_URL.HOME,
      key: 'about',
      label: getTranslation(locale, 'common.about') || 'О Нас',
    },
    {
      href: SITE_URL.SERVICES,
      key: 'services',
      label: getTranslation(locale, 'common.services'),
    },
    {
      href: SITE_URL.OUR_WORKS,
      key: 'portfolio',
      label: getTranslation(locale, 'common.portfolio'),
    },
    {
      href: SITE_URL.CONTACT,
      key: 'contact',
      label: getTranslation(locale, 'common.contact'),
    },
  ];

  const isActive = (href: string) => {
    const hrefPath = getPathnameWithoutLocale(href);
    return (
      currentPath === hrefPath || (hrefPath === '/' && currentPath === '/')
    );
  };

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'fixed' : ''}`}
        ref={containerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container h-full">
          {/* Left Logo */}
          <motion.div
            className="header-logo-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              href={addLocaleToPath(SITE_URL.HOME, locale)}
              className="logo-link"
            >
              <motion.img
                src="/images/logo.svg"
                alt="Logo"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </Link>
          </motion.div>

          {/* Center Menu */}
          <nav className="header-nav">
            <motion.ul
              className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
              initial={false}
            >
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={addLocaleToPath(item.href, locale)}
                      className={`nav-link ${active ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span className="nav-link-text">{item.label}</span>
                      {active && (
                        <motion.div
                          className="nav-link-indicator"
                          layoutId="navIndicator"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <div className="desktop-language-switcher">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="menu-line"
                animate={
                  isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="menu-line"
                animate={
                  isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="menu-line"
                animate={
                  isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Outside header for proper z-index */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <Link
                  href={addLocaleToPath(SITE_URL.HOME, locale)}
                  className="mobile-logo"
                  onClick={closeMenu}
                >
                  <img src="/images/logo.svg" alt="Logo" />
                </Link>
                <button
                  className="mobile-menu-close"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="mobile-nav">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={addLocaleToPath(item.href, locale)}
                        className={`mobile-nav-link ${active ? 'active' : ''}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                        {active && <span className="mobile-active-dot" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Language Switcher */}
              <div className="mobile-language-switcher-wrapper">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                >
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
