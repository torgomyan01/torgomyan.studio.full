'use client';

import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import './_trust-signals.scss';

const SIGNALS = [
  {
    id: 'response',
    labelKey: 'responseLabel',
    icon: 'fas fa-clock',
    getValue: (locale: ReturnType<typeof useLocale>) =>
      getTranslation(locale, 'common.trustSignals.responseValue'),
  },
  {
    id: 'fromPrice',
    labelKey: 'fromPriceLabel',
    icon: 'fas fa-tag',
    getValue: (locale: ReturnType<typeof useLocale>) =>
      getTranslation(locale, 'common.trustSignals.fromPriceValue'),
  },
  {
    id: 'launch',
    labelKey: 'launchLabel',
    icon: 'fas fa-rocket',
    getValue: (locale: ReturnType<typeof useLocale>) =>
      getTranslation(locale, 'common.trustSignals.launchValue'),
  },
  {
    id: 'services',
    labelKey: 'servicesLabel',
    icon: 'fas fa-briefcase',
    getValue: (locale: ReturnType<typeof useLocale>) =>
      getTranslation(locale, 'common.trustSignals.servicesValue'),
  },
] as const;

interface TrustSignalsProps {
  className?: string;
}

function TrustSignals({ className = '' }: TrustSignalsProps) {
  const locale = useLocale();

  return (
    <div className={`trust-signals ${className}`.trim()}>
      {SIGNALS.map((signal) => (
        <div key={signal.id} className="trust-signals__item">
          <div className="trust-signals__icon">
            <i className={signal.icon} aria-hidden="true" />
          </div>
          <div className="trust-signals__value">
            {signal.getValue(locale)}
          </div>
          <div className="trust-signals__label">
            {getTranslation(locale, `common.trustSignals.${signal.labelKey}`)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrustSignals;
