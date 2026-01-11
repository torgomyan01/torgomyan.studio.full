'use client';

import PromotionBlock from '../services-block/promotion-block';
import './_promotion-section.scss';

export default function PromotionSection() {
  return (
    <section className="promotion-section">
      <div className="container">
        <PromotionBlock />
      </div>
    </section>
  );
}
