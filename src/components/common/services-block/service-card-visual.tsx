import { SITE_URL } from '@/utils/consts';

interface ServiceCardVisualProps {
  serviceHref: string;
}

const accent = '#c444ff';
const accentDark = '#562999';
const glow = '#e8c4ff';

const gradientIds: Record<string, string> = {
  [SITE_URL.WEBSITE_DEVELOPMENT]: 'svc-website',
  [SITE_URL.LANDING_PAGE]: 'svc-landing',
  [SITE_URL.BUSINESS_CARD_WEBSITE]: 'svc-business-card',
  [SITE_URL.CORPORATE_WEBSITE]: 'svc-corporate',
  [SITE_URL.ONLINE_SHOP]: 'svc-shop',
  [SITE_URL.WEB_APPLICATIONS]: 'svc-webapp',
  [SITE_URL.UI_UX_DESIGN]: 'svc-uiux',
  [SITE_URL.TECHNICAL_SUPPORT]: 'svc-support',
  [SITE_URL.HOSTING_DOMAINS]: 'svc-hosting',
  [SITE_URL.PAYMENT_INTEGRATION]: 'svc-payment',
  [SITE_URL.BUSINESS_AUTOMATION]: 'svc-automation',
};

function GradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor={accent} />
        <stop offset="1" stopColor={accentDark} />
      </linearGradient>
    </defs>
  );
}

function ServiceCardVisual({ serviceHref }: ServiceCardVisualProps) {
  const gradId = gradientIds[serviceHref] || 'svc-default';

  switch (serviceHref) {
    case SITE_URL.WEBSITE_DEVELOPMENT:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="70" y="30" width="180" height="120" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" />
          <rect x="70" y="30" width="180" height="24" rx="12" fill="rgba(255,255,255,0.12)" />
          <circle cx="86" cy="42" r="4" fill="#ff6b8a" />
          <circle cx="100" cy="42" r="4" fill="#ffd166" />
          <circle cx="114" cy="42" r="4" fill="#6ee7b7" />
          <rect x="90" y="68" width="64" height="8" rx="4" fill={glow} />
          <rect x="90" y="84" width="108" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
          <rect x="90" y="98" width="92" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
          <rect x="90" y="118" width="58" height="20" rx="8" fill={`url(#${gradId})`} />
          <path d="M104 128 L114 120 L124 128 L114 136 Z" fill="white" opacity="0.9" />
          <rect x="128" y="125" width="10" height="2" rx="1" fill="white" opacity="0.7" />
          <GradientDefs id={gradId} />
        </svg>
      );

    case SITE_URL.LANDING_PAGE:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="108" y="26" width="104" height="128" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
          <rect x="122" y="50" width="76" height="10" rx="5" fill={glow} />
          <rect x="130" y="68" width="60" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="134" y="82" width="52" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
          <rect x="138" y="110" width="44" height="24" rx="10" fill={accent} />
          <path d="M160 140 V152 M154 146 L160 152 L166 146" stroke={glow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="236" cy="58" r="16" fill="rgba(196,68,255,0.2)" stroke={accent} strokeWidth="2" />
          <rect x="228" y="53" width="16" height="10" rx="3" fill="white" opacity="0.85" />
        </svg>
      );

    case SITE_URL.BUSINESS_CARD_WEBSITE:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="92" y="42" width="136" height="96" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" />
          <circle cx="160" cy="74" r="18" fill={`url(#${gradId})`} />
          <rect x="116" y="102" width="88" height="8" rx="4" fill={glow} />
          <rect x="128" y="118" width="64" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
          <rect x="136" y="130" width="48" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
          <GradientDefs id={gradId} />
        </svg>
      );

    case SITE_URL.CORPORATE_WEBSITE:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="60" y="34" width="200" height="112" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
          <rect x="60" y="34" width="200" height="22" fill="rgba(255,255,255,0.12)" />
          <rect x="76" y="68" width="52" height="62" rx="6" fill="rgba(196,68,255,0.2)" />
          <rect x="88" y="96" width="28" height="34" fill={accentDark} opacity="0.65" />
          <rect x="82" y="86" width="40" height="10" fill={accent} opacity="0.75" />
          <rect x="144" y="68" width="100" height="10" rx="4" fill={glow} />
          <rect x="144" y="86" width="88" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="144" y="100" width="96" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
          <rect x="144" y="118" width="40" height="16" rx="6" fill={accentDark} />
        </svg>
      );

    case SITE_URL.ONLINE_SHOP:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <circle cx="160" cy="96" r="56" fill="rgba(196,68,255,0.1)" />
          <path
            d="M118 78 C118 66 202 66 202 78 V108 C202 118 194 126 184 126 H136 C126 126 118 118 118 108 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M126 78 H194"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="132" y="86" width="36" height="28" rx="6" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" />
          <rect x="140" y="94" width="20" height="12" rx="3" fill={accentDark} opacity="0.7" />
          <rect x="172" y="86" width="36" height="28" rx="6" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" />
          <rect x="180" y="94" width="20" height="12" rx="3" fill={accent} opacity="0.75" />
          <path
            d="M132 126 H188"
            stroke={glow}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="144" cy="138" r="7" fill={accentDark} />
          <circle cx="176" cy="138" r="7" fill={accentDark} />
          <circle cx="144" cy="138" r="3" fill="rgba(255,255,255,0.35)" />
          <circle cx="176" cy="138" r="3" fill="rgba(255,255,255,0.35)" />
          <path
            d="M148 62 C148 52 172 52 172 62"
            stroke={glow}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="214" y="52" width="34" height="22" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
          <circle cx="224" cy="63" r="4" fill="#6ee7b7" />
          <rect x="232" y="60" width="10" height="6" rx="2" fill={glow} />
          <circle cx="106" cy="52" r="12" fill="#ff6b8a" opacity="0.9" />
          <path d="M102 52 H110 M106 48 V56" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <GradientDefs id={gradId} />
        </svg>
      );

    case SITE_URL.WEB_APPLICATIONS:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="54" y="38" width="212" height="104" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
          <rect x="66" y="54" width="68" height="72" rx="8" fill="rgba(86,41,153,0.45)" />
          <rect x="78" y="102" width="14" height="16" rx="3" fill={accent} />
          <rect x="96" y="90" width="14" height="28" rx="3" fill={glow} />
          <rect x="114" y="78" width="14" height="40" rx="3" fill={accent} opacity="0.75" />
          <rect x="150" y="58" width="96" height="8" rx="4" fill={glow} />
          <rect x="150" y="76" width="84" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="150" y="90" width="76" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
          <rect x="150" y="112" width="52" height="16" rx="8" fill={accentDark} />
        </svg>
      );

    case SITE_URL.UI_UX_DESIGN:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="52" y="46" width="92" height="88" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeDasharray="6 4" />
          <rect x="176" y="46" width="92" height="88" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
          <circle cx="98" cy="72" r="12" fill={accent} />
          <rect x="72" y="94" width="52" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="72" y="108" width="40" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
          <rect x="192" y="64" width="60" height="8" rx="4" fill={glow} />
          <rect x="192" y="80" width="48" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
          <rect x="192" y="100" width="44" height="16" rx="8" fill={accentDark} />
          <circle cx="230" cy="34" r="7" fill="#ff6b8a" />
          <circle cx="248" cy="34" r="7" fill="#ffd166" />
          <circle cx="266" cy="34" r="7" fill="#6ee7b7" />
        </svg>
      );

    case SITE_URL.TECHNICAL_SUPPORT:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="64" y="44" width="120" height="92" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
          <rect x="80" y="60" width="88" height="10" rx="5" fill={glow} />
          <rect x="80" y="78" width="72" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          <rect x="80" y="92" width="80" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
          <rect x="80" y="106" width="56" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
          <rect x="80" y="118" width="40" height="10" rx="5" fill={`url(#${gradId})`} />
          <circle cx="200" cy="90" r="40" fill="rgba(196,68,255,0.12)" stroke={accent} strokeWidth="2" />
          <path
            d="M176 88 C176 76 224 76 224 88 V100 C224 108 218 114 210 114 H190 C182 114 176 108 176 100 Z"
            fill={accentDark}
          />
          <rect x="168" y="92" width="10" height="20" rx="5" fill={accent} />
          <rect x="222" y="92" width="10" height="20" rx="5" fill={accent} />
          <path d="M188 118 C188 124 208 124 208 118" stroke={glow} strokeWidth="2" strokeLinecap="round" />
          <circle cx="248" cy="52" r="16" fill="rgba(110,231,183,0.15)" stroke="#6ee7b7" strokeWidth="2" />
          <path d="M241 52 L246 57 L255 46" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="248" cy="128" r="16" fill="rgba(255,209,102,0.15)" stroke="#ffd166" strokeWidth="2" />
          <path d="M248 120 V128 L254 134" stroke="#ffd166" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <GradientDefs id={gradId} />
        </svg>
      );

    case SITE_URL.HOSTING_DOMAINS:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <ellipse cx="160" cy="136" rx="68" ry="12" fill="rgba(196,68,255,0.18)" />
          <rect x="108" y="68" width="104" height="58" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" />
          <rect x="120" y="78" width="12" height="38" rx="2" fill={accentDark} />
          <rect x="140" y="78" width="12" height="38" rx="2" fill={accentDark} />
          <rect x="160" y="78" width="12" height="38" rx="2" fill={accent} />
          <rect x="180" y="78" width="12" height="38" rx="2" fill={accent} />
          <circle cx="196" cy="86" r="2.5" fill="#6ee7b7" />
          <circle cx="196" cy="96" r="2.5" fill="#6ee7b7" />
          <circle cx="124" cy="86" r="2.5" fill="#6ee7b7" />
          <circle cx="160" cy="38" r="18" fill="rgba(255,255,255,0.06)" stroke={glow} strokeWidth="2" />
          <ellipse cx="160" cy="38" rx="18" ry="6" stroke="rgba(255,255,255,0.3)" fill="none" />
          <path d="M142 38 H178 M160 20 V56" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case SITE_URL.PAYMENT_INTEGRATION:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <rect x="84" y="50" width="152" height="96" rx="14" fill={`url(#${gradId})`} />
          <rect x="84" y="50" width="152" height="28" rx="14" fill="rgba(0,0,0,0.2)" />
          <rect x="100" y="92" width="40" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
          <rect x="100" y="108" width="60" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
          <rect x="100" y="124" width="48" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
          <circle cx="196" cy="112" r="12" fill="rgba(255,255,255,0.15)" />
          <circle cx="208" cy="112" r="12" fill="rgba(255,255,255,0.28)" />
          <circle cx="240" cy="88" r="14" fill="rgba(196,68,255,0.2)" stroke={glow} strokeWidth="2" />
          <path d="M235 88 L240 93 L245 83" stroke={glow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <GradientDefs id={gradId} />
        </svg>
      );

    case SITE_URL.BUSINESS_AUTOMATION:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <circle cx="88" cy="86" r="24" fill="rgba(196,68,255,0.15)" stroke={accent} strokeWidth="2" />
          <circle cx="232" cy="86" r="24" fill="rgba(196,68,255,0.15)" stroke={accent} strokeWidth="2" />
          <circle cx="160" cy="130" r="20" fill="rgba(86,41,153,0.35)" stroke={glow} strokeWidth="2" />
          <circle cx="88" cy="86" r="8" fill={accent} />
          <circle cx="232" cy="86" r="8" fill={accent} />
          <circle cx="160" cy="130" r="6" fill={glow} />
          <path d="M112 86 H136 M184 86 H208" stroke={glow} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M112 86 C130 86 142 110 148 118" stroke={glow} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M208 86 C190 86 178 110 172 118" stroke={glow} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <rect x="148" y="50" width="24" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
          <path d="M160 58 V72" stroke={glow} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
          <circle cx="160" cy="90" r="44" fill="rgba(196,68,255,0.2)" stroke={accent} strokeWidth="2" />
          <rect x="136" y="78" width="48" height="24" rx="8" fill={accentDark} />
        </svg>
      );
  }
}

export default ServiceCardVisual;
