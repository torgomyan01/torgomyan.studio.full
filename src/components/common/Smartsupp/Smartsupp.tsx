'use client';

import { useEffect } from 'react';

const SMARTSUPP_KEY = '0da9c15af244c20946939b6a2d7883cc99517cb3';

const Smartsupp = () => {
  useEffect(() => {
    // Initialize Smartsupp configuration
    (window as any)._smartsupp = (window as any)._smartsupp || {};
    (window as any)._smartsupp.key = SMARTSUPP_KEY;

    // Initialize smartsupp function before loading script
    (window as any).smartsupp =
      (window as any).smartsupp ||
      function () {
        ((window as any).smartsupp as any)._.push(arguments);
      };
    ((window as any).smartsupp as any)._ =
      ((window as any).smartsupp as any)._ || [];

    // Load Smartsupp script if not already loaded
    if (!document.querySelector('script[src*="smartsuppchat.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = 'https://www.smartsuppchat.com/loader.js?';

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    }
  }, []);

  return null;
};

export default Smartsupp;
