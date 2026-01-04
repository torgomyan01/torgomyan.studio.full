export const SITE_URL = {
  HOME: '/',
  SERVICES: '/services',
  WEBSITE_DEVELOPMENT: '/services/website-development',
  LANDING_PAGE: '/services/landing-page',
  BUSINESS_CARD_WEBSITE: '/services/business-card-website',
  CORPORATE_WEBSITE: '/services/corporate-website',
  ONLINE_SHOP: '/services/online-shop',
  WEB_APPLICATIONS: '/services/web-applications',
  SEO: '/services/seo',
  UI_UX_DESIGN: '/services/ui-ux-design',
  TECHNICAL_SUPPORT: '/services/technical-support',
  HOSTING_DOMAINS: '/services/hosting-domains',
  PAYMENT_INTEGRATION: '/services/payment-integration',
  BUSINESS_AUTOMATION: '/services/business-automation',
  OUR_WORKS: '/our-works',
  PRIVACY_POLICY: '/privacy-policy',
  CALCULATOR: '/calculator',
  CONTACT: '/contact',
};

export const fileHost = 'https://2410924f2b33.hosting.myjino.ru/';
export const fileHostUpload =
  'https://2410924f2b33.hosting.myjino.ru/save-images.php';
export const fileHostUploadDoc =
  'https://2410924f2b33.hosting.myjino.ru/upload-doc-file.php';
export const fileHostRemove =
  'https://2410924f2b33.hosting.myjino.ru/remove-image.php';

export const localStorageKeys = {
  tokenData: 'tokenData',
  tokenTime: 'tokenTime',
  tokenAdmin: 'tokenAdmin',
  userAdmin: 'userAdmin',
  languages: 'languages',
  cookieComplete: 'cookieComplete',
  lastMessageTime: 'lastMessageTime',
};

export const services = [
  {
    title: 'Разработка Сайтов',
    href: SITE_URL.WEBSITE_DEVELOPMENT,
  },
  {
    title: 'Лендинг',
    href: SITE_URL.LANDING_PAGE,
  },
  {
    title: 'Сайт-визитка',
    href: SITE_URL.BUSINESS_CARD_WEBSITE,
  },
  {
    title: 'Корпоративный сайт',
    href: SITE_URL.CORPORATE_WEBSITE,
  },
  {
    title: 'Интернет-магазин',
    href: SITE_URL.ONLINE_SHOP,
  },
  {
    title: 'Веб-приложения',
    href: SITE_URL.WEB_APPLICATIONS,
  },
  {
    title: 'Продвижение сайтов (SEO)',
    href: SITE_URL.SEO,
  },
  {
    title: 'Дизайн интерфейсов (UI/UX)',
    href: SITE_URL.UI_UX_DESIGN,
  },
  {
    title: 'Техническая поддержка',
    href: SITE_URL.TECHNICAL_SUPPORT,
  },
  {
    title: 'Хостинг и домены',
    href: SITE_URL.HOSTING_DOMAINS,
  },
  {
    title: 'Интеграция платежных систем',
    href: SITE_URL.PAYMENT_INTEGRATION,
  },
  {
    title: 'Автоматизация бизнес-процессов',
    href: SITE_URL.BUSINESS_AUTOMATION,
  },
];

const dealkGoUrl = {
  HOME: '/',
  FAQ: '/faq',
  ACHIEVEMENTS: '/achievements',
  PROFILE_SETTINGS: '/profile-settings',
  PROFILE: '/profile',
  VIEW_HISTORY: '/view-history',
  CATALOG_WARFACE: '/catalog-warface',
  FINANCE: '/finance',
  REVIEWS: '/reviews',
  REVIEWS2: '/reviews2',
  REF_SYSTEMS: '/ref-systems',
  POPULAR_CASES: '/popular-cases',
  GUARANTEES: '/guarantees',
  RANDOM_ITEM: '/random-item',
  BOOKMARKS: '/bookmarks',
  CASE: '/case',
  MY_MESSAGE: '/my-message',
  GAME_SELECTION: '/game-selection',
  NOTIFICATION: '/notification',
  DRAW: '/draw',
  ORDER_TABLE: '/order-table',
  PURCHASES_SALES: '/purchases-sales',
  CHAT_CUSTOMER: '/chat-customer',
  SUPPORT: '/support',
  TOP_USERS: '/top-users',
  RATING_WARFACE: '/rating-warface',
  MY_PRODUCTS: '/my-products',
  CHAT_SELLER: '/chat-seller',
};

const ciklevkaUrl = [
  '/',
  '/actions-subscribe.html',
  '/calculator.html',
  '/cards.html',
  '/certificate.html',
  '/confirmed-order.html',
  '/contacts.html',
  '/for-company.html',
  '/index.html',
  '/information.html',
  '/laying.html',
  '/modals.html',
  '/news-1.html',
  '/news.html',
  '/our-services.html',
  '/our-works.html',
  '/partners.html',
  '/price-our-works.html',
  '/product-page.html',
  '/products.html',
  '/question.html',
  '/rent-one-item.html',
  '/rent.html',
  '/reviews-pag.html',
  '/shipping-payment.html',
  '/shop.html',
  '/slipper.html',
  '/tanks-for-contact-me.html',
  '/thanks-page.html',
  '/tinting.html',
  '/tsiklevka.html',
];

export const Works = [
  {
    name: 'Galamat',
    slug: 'galamat',
    imgUrl: 'images/glamat-kz.png',
    links: [
      {
        name: 'Home',
        url: 'https://galamat.kz',
      },
    ],
    created:
      'Next.js, Typescript, MySql, Prisma, React JS, TypeScript, Material UI',
    description:
      'Крупная казахстанская компания, специализирующаяся на предоставлении современных цифровых решений для бизнеса. Известна на рынке Казахстана как надежный партнер в области технологий и инноваций.',
  },
  {
    name: 'Swappe',
    slug: 'swappe',
    imgUrl: 'images/swappe.ru.png',
    links: [
      {
        name: 'Home',
        url: 'https://swappe.ru',
      },
    ],
    created:
      'Next.js, Typescript, MySql, Prisma, React JS, TypeScript, Material UI',
    description:
      'Популярная российская платформа для обмена и торговли, известная своей удобной системой и широкой пользовательской базой. Один из ведущих сервисов в своей нише на российском рынке.',
  },
  {
    name: 'ZKTeco',
    slug: 'zkteco',
    imgUrl: 'images/ZKTeco.png',
    links: [],
    created: 'React JS, Next.js, TypeScript, Material UI',
    description:
      'Международная компания-лидер в области биометрических систем безопасности и контроля доступа. ZKTeco является одним из крупнейших производителей систем безопасности в мире, с продукцией, используемой в более чем 180 странах. Признанный лидер индустрии с многолетним опытом.',
  },
  {
    name: 'Line-Artworks',
    slug: 'line-artworks',
    imgUrl: 'images/line-artworks.png',
    links: [
      {
        name: 'Home',
        url: 'https://line-artworks.com/',
      },
      {
        name: 'Projects',
        url: 'https://torgomyan01.github.io/line-artworks/projects.html',
      },
      {
        name: 'Studio',
        url: 'https://torgomyan01.github.io/line-artworks/studio.html',
      },
    ],
    created: 'HTML CSS JS WordPress',
    description:
      'Креативное дизайн-агентство, специализирующееся на создании уникальных художественных проектов и визуальных решений. Известно своими инновационными подходами в области современного искусства и дизайна.',
  },
  {
    name: 'Sdney',
    slug: 'sdney',
    imgUrl: 'images/Sydney.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/sydney/',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Современная дизайн-студия, создающая элегантные и функциональные веб-решения. Известна своим вниманием к деталям и высоким качеством визуального оформления проектов.',
  },
  {
    name: 'Kettik-travel',
    slug: 'kettik-travel',
    imgUrl: 'images/kettik-travel.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/Kettik-travel/home.html',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Туристическая компания, специализирующаяся на организации путешествий и туров. Популярный сервис в сфере туризма, предлагающий качественные услуги для путешественников.',
  },
  {
    name: 'Mosco',
    slug: 'mosco',
    imgUrl: 'images/Mosco.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/mosco/',
      },
      {
        name: 'Service',
        url: 'https://torgomyan01.github.io/mosco/Service_and.html',
      },
      {
        name: 'Company',
        url: 'https://torgomyan01.github.io/mosco/company_and.html',
      },
      {
        name: 'Contact',
        url: 'https://torgomyan01.github.io/mosco/contact_and.html',
      },
      {
        name: 'News',
        url: 'https://torgomyan01.github.io/mosco/news_and.html',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Корпоративная компания, предоставляющая широкий спектр профессиональных услуг. Известна своей надежностью и качественным сервисом в различных сферах бизнеса.',
  },
  {
    name: 'Lagom',
    slug: 'lagom',
    imgUrl: 'images/Lagom.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/lagom/',
      },
    ],
    created: 'HTML CSS SCSS JS jQUERY GSAP',
    description:
      'Современная дизайн-студия, следующая философии минимализма и элегантности. Известна созданием стильных и функциональных дизайнерских решений с акцентом на качество и эстетику.',
  },
  {
    name: 'Artel',
    slug: 'artel',
    imgUrl: 'images/ARTEL1.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/artel/',
      },
    ],
    created: 'HTML CSS SCSS JS jQUERY GSAP ',
    description:
      'Крупнейший производитель бытовой техники и электроники в Центральной Азии. Artel является одним из ведущих брендов в регионе, известным высоким качеством продукции и инновационными технологиями. Компания с многолетней историей и признанной репутацией.',
  },
  {
    name: 'Empover-Prosper',
    slug: 'empover-prosper',
    imgUrl: 'images/Empower-Prosper.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/empower-prosper/',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Компания, специализирующаяся на развитии бизнеса и предоставлении консалтинговых услуг. Известна своими эффективными решениями для роста и процветания бизнеса клиентов.',
  },
  {
    name: 'ArtHall-Synergy Landing ',
    slug: 'arthall-synergy-landing',
    imgUrl: 'images/ArtHall-Synergy-Landing.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/ArtHall-Synergy-Landing/',
      },
    ],
    created: 'HTML CSS SCSS JS',
    description:
      'Престижная арт-галерея и культурный центр, объединяющий современное искусство и инновационные проекты. Известное место в арт-сообществе, привлекающее внимание ценителей искусства и коллекционеров.',
  },
  {
    name: 'Mir Darog',
    slug: 'mir-darog',
    imgUrl: 'images/mir-darog-screen.png',
    links: [
      {
        name: 'Home',
        url: 'https://www.mir-darog.ru/',
      },
    ],
    created: 'HTML CSS SCSS JS jQUERY',
    description:
      'Крупная дорожно-строительная компания, специализирующаяся на строительстве и ремонте автомобильных дорог. Известная компания в строительной индустрии с многолетним опытом работы и реализованными проектами федерального значения.',
  },
  {
    name: 'Dealkgo',
    slug: 'dealkgo',
    imgUrl: 'images/Dealkgo.png',
    links: Object.keys(dealkGoUrl).map((item) => {
      return {
        name: item.replace(/_/g, ' '),
        url: `https://dealkgo-rho.vercel.app${
          dealkGoUrl[item as keyof typeof dealkGoUrl] as string
        }`,
      };
    }),
    created: 'React JS, TypeScript, Material UI',
    description:
      'Популярная игровая платформа для торговли игровыми предметами и аккаунтами. Один из ведущих маркетплейсов в игровой индустрии, известный своей надежностью и широким ассортиментом игровых товаров.',
  },
  {
    name: 'Web-It',
    slug: 'web-it',
    imgUrl: 'images/Web-IQ.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/web-it/',
      },
    ],
    created: 'React JS, TypeScript, Material UI',
    description:
      'IT-компания, специализирующаяся на разработке веб-приложений и цифровых решений. Известна своими инновационными подходами в области веб-разработки и высоким качеством технических решений.',
  },
  {
    name: 'ԿՈՆՅԱԿ',
    slug: 'konyak',
    imgUrl: 'images/aygezardi-konyki-gorcaran.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/akg/',
      },
      {
        name: 'Product',
        url: 'https://torgomyan01.github.io/akg/product.html',
      },
      {
        name: 'Products',
        url: 'https://torgomyan01.github.io/akg/products.html',
      },
    ],
    created: 'React JS, TypeScript, Material UI',
    description:
      'Известный армянский производитель коньяка премиум-класса. Бренд с богатой историей и традициями, признанный как в Армении, так и на международном рынке. Продукция компании ценится знатоками и коллекционерами.',
  },
  {
    name: 'Ciklevka',
    slug: 'ciklevka',
    imgUrl: 'images/Ciklevka.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/adz-motors/',
      },
    ],
    created: 'HTML CSS SCSS JS ',
    description:
      'Специализированная компания по циклевке и реставрации паркетных полов. Известна высоким качеством работ и использованием современных технологий в области напольных покрытий.',
  },
  {
    name: 'Adz-motors',
    slug: 'adz-motors',
    imgUrl: 'images/adz-motors.png',
    links: ciklevkaUrl.map((url) => {
      return {
        name: url === '/' ? 'Home' : url.replace(/.html/g, ''),
        url: `https://torgomyan01.github.io/ciklevka${url}`,
      };
    }),
    created: 'HTML CSS SCSS JS ',
    description:
      'Автомобильная компания, специализирующаяся на продаже и обслуживании автомобилей. Известна широким ассортиментом и качественным сервисом в автомобильной индустрии.',
  },
  {
    name: 'MediaCatalog',
    slug: 'mediacatalog',
    imgUrl: 'images/MediaCatalog.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/MediaCatalog/',
      },
      {
        name: 'Ads Company',
        url: 'https://torgomyan01.github.io/MediaCatalog/ads-company.html',
      },
      {
        name: 'Auction',
        url: 'https://torgomyan01.github.io/MediaCatalog/auction.html',
      },
      {
        name: 'Profile',
        url: 'https://torgomyan01.github.io/MediaCatalog/profile.html',
      },
    ],
    created: 'HTML CSS SCSS JS',
    description:
      'Инновационная медиа-платформа для каталогизации и управления медиа-контентом. Современный сервис, объединяющий рекламные компании, аукционы и профильные сервисы в единой экосистеме.',
  },
  {
    name: 'Aniox',
    slug: 'aniox',
    imgUrl: 'images/Aniox.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/ainox/',
      },
      {
        name: 'confirm-email.html',
        url: 'https://torgomyan01.github.io/ainox/confirm-email.html',
      },
      {
        name: 'email.html',
        url: 'https://torgomyan01.github.io/ainox/email.html',
      },
      {
        name: 'finish.html',
        url: 'https://torgomyan01.github.io/ainox/finish.html',
      },
      {
        name: 'login.html',
        url: 'https://torgomyan01.github.io/ainox/login.html',
      },
      {
        name: 'new-ticket.html',
        url: 'https://torgomyan01.github.io/ainox/new-ticket.html',
      },
      {
        name: 'robo.html',
        url: 'https://torgomyan01.github.io/ainox/robo.html',
      },
      {
        name: 'steps.html',
        url: 'https://torgomyan01.github.io/ainox/steps.html',
      },
      {
        name: 'ticket.html',
        url: 'https://torgomyan01.github.io/ainox/ticket.html',
      },
      {
        name: 'ticket-message.html',
        url: 'https://torgomyan01.github.io/ainox/ticket-message.html',
      },
      {
        name: 'trial.html',
        url: 'https://torgomyan01.github.io/ainox/trial.html',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Современная система управления тикетами и поддержкой клиентов. Инновационная платформа для организации эффективной работы службы поддержки с использованием автоматизации и AI-технологий.',
  },
  {
    name: 'Arthall-Synergy',
    slug: 'arthall-synergy',
    imgUrl: 'images/ArtHall-Synergy.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/Arthall-Synergy/',
      },
    ],
    created: 'HTML CSS JS',
    description:
      'Престижная арт-галерея, объединяющая традиции и современность в мире искусства. Известное культурное пространство, привлекающее внимание художников, коллекционеров и ценителей искусства.',
  },
  {
    name: 'МосСервис',
    slug: 'mosservis',
    imgUrl: 'images/mosservices.png',
    links: [
      {
        name: 'Home',
        url: 'https://torgomyan01.github.io/santechnik/',
      },
    ],
    created: 'HTML CSS JS',
  },
  {
    name: 'RimPlitka',
    slug: 'rimplitka',
    imgUrl: 'images/RIM-PLITKA.png',
    links: [
      {
        name: 'index.html',
        url: 'https://mrs-rimplitka.ru/',
      },
    ],
    created: 'HTML CSS JS BOOTSTRAP',
    description:
      'Крупный поставщик керамической плитки и отделочных материалов. Известная компания в строительной индустрии с широким ассортиментом продукции и надежной репутацией на рынке.',
  },
  {
    name: 'Arthall',
    slug: 'arthall',
    imgUrl: 'images/ArtHall.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/arthall/',
      },
      {
        name: 'applications-for-participation.html',
        url: 'https://torgomyan01.github.io/arthall/applications-for-participation.html',
      },
      {
        name: 'art-critic-profile.html',
        url: 'https://torgomyan01.github.io/arthall/art-critic-profile.html',
      },
      {
        name: 'art-critics.html',
        url: 'https://torgomyan01.github.io/arthall/art-critics.html',
      },
      {
        name: 'art-dealer-profile.html',
        url: 'https://torgomyan01.github.io/arthall/art-dealer-profile.html',
      },
      {
        name: 'artist-profile.html',
        url: 'https://torgomyan01.github.io/arthall/artist-profile.html',
      },
      {
        name: 'dealers.html',
        url: 'https://torgomyan01.github.io/arthall/dealers.html',
      },
      {
        name: 'exhibition-space-profile.html',
        url: 'https://torgomyan01.github.io/arthall/exhibition-space-profile.html',
      },
      {
        name: 'inserts.html',
        url: 'https://torgomyan01.github.io/arthall/inserts.html',
      },
      {
        name: 'sign-up.html',
        url: 'https://torgomyan01.github.io/arthall/sign-up.html',
      },
    ],
    created: 'HTML SCSS Bootstrap JS',
    description:
      'Масштабная арт-платформа, объединяющая художников, арт-критиков, дилеров и выставочные пространства. Крупнейшая экосистема в арт-индустрии, способствующая развитию современного искусства и культурного обмена.',
  },
  {
    name: 'Max-Asfalt',
    slug: 'max-asfalt',
    imgUrl: 'images/max-asfalt.png',
    links: [
      {
        name: 'index.html',
        url: 'https://mir-darog.ru/',
      },
    ],
    created: 'HTML CSS JAVASCRIPT',
    description:
      'Крупная дорожно-строительная компания, специализирующаяся на производстве и укладке асфальта. Известная компания в дорожной индустрии с многолетним опытом и реализованными проектами государственного значения.',
  },
  {
    name: 'Easy Card',
    slug: 'easy-card',
    imgUrl: 'images/EasyCards-Ru-Home.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/easycards/',
      },
      {
        name: 'bakai-card.html',
        url: 'https://torgomyan01.github.io/easycards/bakai-card.html',
      },
      {
        name: 'freedom-card.html',
        url: 'https://torgomyan01.github.io/easycards/freedom-card.html',
      },
      {
        name: 'kazakhstan.html',
        url: 'https://torgomyan01.github.io/easycards/kazakhstan.html',
      },
      {
        name: 'kirghizia.html',
        url: 'https://torgomyan01.github.io/easycards/kirghizia.html',
      },
      {
        name: 'optimal-card.html',
        url: 'https://torgomyan01.github.io/easycards/optimal-card.html',
      },
    ],
    created: 'HTML CSS JS JQUERY AOS-JS',
    description:
      'Финансовая платформа, предоставляющая банковские карты и финансовые услуги в странах Центральной Азии. Популярный сервис, известный удобством использования и широким охватом регионального рынка.',
  },
  {
    name: 'Neural-Network',
    slug: 'neural-network',
    imgUrl: 'images/Widgets.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/neural-network/',
      },
      {
        name: 'widgets.html',
        url: 'https://torgomyan01.github.io/neural-network/widgets.html',
      },
      {
        name: 'services.html',
        url: 'https://torgomyan01.github.io/neural-network/services.html',
      },
      {
        name: 'Trash-detection.html',
        url: 'https://torgomyan01.github.io/Trash-detection.html',
      },
      {
        name: 'widget.html',
        url: 'https://torgomyan01.github.io/widget.html',
      },
      {
        name: 'Classification-of-skin-diseases.html',
        url: 'https://torgomyan01.github.io/neural-network/Classification-of-skin-diseases.html',
      },
      {
        name: 'contacts.html',
        url: 'https://torgomyan01.github.io/neural-network/contacts.html',
      },
      {
        name: 'Definition-of-baggage-security.html',
        url: 'https://torgomyan01.github.io/neural-network/Definition-of-baggage-security.html',
      },
      {
        name: 'definition-of-hand-gestures.html',
        url: 'https://torgomyan01.github.io/neural-network/definition-of-hand-gestures.html',
      },
      {
        name: 'Detection-of-free-parking-spaces.html',
        url: 'https://torgomyan01.github.io/neural-network/Detection-of-free-parking-spaces.html',
      },
      {
        name: 'fixing-the-movement-of-people.html',
        url: 'https://torgomyan01.github.io/neural-network/fixing-the-movement-of-people.html',
      },
      {
        name: 'neural-network-capabilities.html',
        url: 'https://torgomyan01.github.io/neural-network/neural-network-capabilities.html',
      },
      {
        name: 'recognition-of-emotions-in-photo.html',
        url: 'https://torgomyan01.github.io/neural-network/recognition-of-emotions-in-photo.html',
      },
      {
        name: 'Removing-people-from-a-video.html',
        url: 'https://torgomyan01.github.io/neural-network/Removing-people-from-a-video.html',
      },
      {
        name: 'Segmentation-bacteria-under-the-microscope.html',
        url: 'https://torgomyan01.github.io/neural-network/Segmentation-bacteria-under-the-microscope.html',
      },
      {
        name: 'segmentation-of-people-in-the-photo.html',
        url: 'https://torgomyan01.github.io/neural-network/segmentation-of-people-in-the-photo.html',
      },
    ],
    created: 'HTML CSS JS JQUERY',
    description:
      'Инновационная AI-платформа, специализирующаяся на разработке решений на основе нейронных сетей. Компания известна передовыми технологиями в области компьютерного зрения, распознавания образов и машинного обучения. Признанный лидер в сфере искусственного интеллекта.',
  },
  {
    name: 'Kupon',
    slug: 'kupon',
    imgUrl: 'images/Kupon.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/kupon/',
      },
      {
        name: 'product.html',
        url: 'https://torgomyan01.github.io/kupon/product.html',
      },
      {
        name: 'sale.html',
        url: 'https://torgomyan01.github.io/kupon/sale.html',
      },
    ],
    created: 'HTML CSS JS BOOTSTRAP',
    description:
      'Популярная платформа скидок и купонов, помогающая пользователям экономить на покупках. Известный сервис в сфере электронной коммерции с широкой базой партнеров и активной аудиторией.',
  },
  {
    name: 'Neuron',
    slug: 'neuron',
    imgUrl: 'images/neuron.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/neuron/',
      },
    ],
    created: 'HTML CSS JS BOOTSTRAP JS',
    description:
      'Технологическая компания, специализирующаяся на разработке инновационных решений в области нейросетей и искусственного интеллекта. Известна своими передовыми разработками и техническими решениями.',
  },
  {
    name: '54 Agency',
    slug: '54-agency',
    imgUrl: 'images/54-agensy.png',
    links: [
      {
        name: 'index.html',
        url: 'https://54-agency-test.vercel.app/',
      },
    ],
    created: 'React JS',
    description:
      'Креативное агентство, специализирующееся на разработке современных цифровых решений и брендинге. Известно своими инновационными подходами и качественными проектами в области маркетинга и дизайна.',
  },
  {
    name: 'YTSMp3.org',
    slug: 'ytsmp3',
    imgUrl: 'images/ytsmp3.png',
    links: [
      {
        name: 'Home',
        url: 'https://www.ytsmp3.org',
      },
    ],
    created: 'Next.js',
    description:
      'Популярный онлайн-сервис для конвертации видео в аудио формат. Широко известный инструмент среди пользователей, обрабатывающий тысячи запросов ежедневно и предоставляющий удобный сервис для работы с медиа-контентом.',
  },
  {
    name: 'Kampus',
    slug: 'kampus',
    imgUrl: 'images/kampus.png',
    links: [
      {
        name: 'Login',
        url: 'https://kampus-six.vercel.app',
      },
      {
        name: 'Dashboard',
        url: 'https://kampus-six.vercel.app/dashboard',
      },
      {
        name: 'Program Fonds',
        url: 'https://kampus-six.vercel.app/program-fonds',
      },
      {
        name: 'Analytics',
        url: 'https://kampus-six.vercel.app/analytic_users',
      },
      {
        name: 'List Universities',
        url: 'https://kampus-six.vercel.app/list-universities',
      },
      {
        name: 'Rating Users',
        url: 'https://kampus-six.vercel.app/rating_users',
      },
      {
        name: 'My Resume',
        url: 'https://kampus-six.vercel.app/my-resume',
      },
    ],
    created: 'React JS',
    description:
      'Инновационная образовательная платформа для студентов и университетов. Современная экосистема, объединяющая образовательные учреждения, студентов и работодателей. Популярная платформа в сфере образования с широким функционалом и аналитикой.',
  },
  {
    name: 'RosMigrant',
    slug: 'rosmigrant',
    imgUrl: 'images/ros-mirgrant.png',
    links: [
      {
        name: 'index.html',
        url: 'https://torgomyan01.github.io/RosMigrant/',
      },
      {
        name: 'news.html',
        url: 'https://torgomyan01.github.io/RosMigrant/news.html',
      },
      {
        name: 'wiframe.html',
        url: 'https://torgomyan01.github.io/RosMigrant/wiframe.html',
      },
    ],
    created: 'HTML CSS Bootstrap JAVASCRIPT',
    description:
      'Информационный портал, предоставляющий услуги и информацию для мигрантов в России. Известный сервис, помогающий тысячам людей с вопросами миграции, документооборота и адаптации. Важный ресурс в сфере миграционных услуг.',
  },
];

export const testimonials = [
  {
    author: 'Александр Петров',
    company: 'Galamat',
    rating: 5,
    text: 'Отличная работа! Команда Torgomyan.Studio создала для нас современный и функциональный сайт. Все было сделано в срок, качественно и профессионально. Особенно понравилось внимание к деталям и готовность вносить изменения.',
    project: 'Galamat',
  },
  {
    author: 'Мария Иванова',
    company: 'Swappe',
    rating: 5,
    text: 'Очень довольны результатом! Сайт получился именно таким, как мы хотели. Команда проявила профессионализм на всех этапах работы - от дизайна до запуска. Рекомендую!',
    project: 'Swappe',
  },
  {
    author: 'Дмитрий Смирнов',
    company: 'ZKTeco',
    rating: 5,
    text: 'Работали с Torgomyan.Studio над корпоративным сайтом. Все выполнено на высшем уровне. Современный дизайн, удобная навигация, быстрая загрузка. Клиенты остались довольны.',
    project: 'ZKTeco',
  },
  {
    author: 'Елена Козлова',
    company: 'Artel',
    rating: 5,
    text: 'Профессиональная команда, которая понимает потребности бизнеса. Создали для нас красивый и функциональный сайт. Особенно понравилось, что учли все наши пожелания и предложили свои идеи.',
    project: 'Artel',
  },
  {
    author: 'Игорь Волков',
    company: 'Dealkgo',
    rating: 5,
    text: 'Отличный опыт сотрудничества! Разработали сложное веб-приложение с множеством функций. Все работает стабильно, интерфейс интуитивно понятный. Спасибо за качественную работу!',
    project: 'Dealkgo',
  },
  {
    author: 'Анна Соколова',
    company: 'Kampus',
    rating: 5,
    text: 'Очень благодарны команде за проделанную работу! Создали для нас образовательную платформу с нуля. Все функции работают отлично, дизайн современный и привлекательный. Рекомендую всем!',
    project: 'Kampus',
  },
  {
    author: 'Сергей Лебедев',
    company: 'Mir Darog',
    rating: 5,
    text: 'Работали над сайтом дорожно-строительной компании. Результат превзошел ожидания! Сайт получился информативным, красивым и удобным. Команда всегда была на связи и оперативно решала все вопросы.',
    project: 'Mir Darog',
  },
  {
    author: 'Ольга Новикова',
    company: 'Neural-Network',
    rating: 5,
    text: 'Профессионалы своего дела! Разработали для нас AI-платформу с множеством сложных функций. Все работает безупречно. Особенно понравилось внимание к деталям и качество кода.',
    project: 'Neural-Network',
  },
];
