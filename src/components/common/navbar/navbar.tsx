'use client';

import { SITE_URL } from '@/utils/consts';
import './_header.scss';

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

function Navbar() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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
    <header
      className={`header ${isScrolled ? 'fixed' : ''}`}
      ref={containerRef}
    >
      <div className="container">
        <ul className={`main-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href={SITE_URL.HOME} className="menu-link" onClick={closeMenu}>
              О Нас
            </a>
          </li>
          <li>
            <Link
              href={SITE_URL.SERVICES}
              className="menu-link"
              onClick={closeMenu}
            >
              Услуги
            </Link>
          </li>
          <li></li>
          <li>
            <Link
              href={SITE_URL.OUR_WORKS}
              className="menu-link"
              onClick={closeMenu}
            >
              Наши работы
            </Link>
          </li>
          <li>
            <Link
              href={SITE_URL.CONTACT}
              className="menu-link"
              onClick={closeMenu}
            >
              Связь
            </Link>
          </li>
        </ul>
        <Link href={SITE_URL.HOME} className="logo">
          <img src="/images/logo.svg" alt="" />
        </Link>
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
  );
}

export default Navbar;
