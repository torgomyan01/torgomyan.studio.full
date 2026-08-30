import { ChatData } from '../types';

// Типы для анализа ответов пользователя
type AnswerSentiment = 'positive' | 'negative' | 'neutral' | 'uncertain';
type UserIntent = 'interested' | 'hesitant' | 'objecting' | 'ready_to_buy';
type EmotionType =
  | 'excited'
  | 'curious'
  | 'worried'
  | 'skeptical'
  | 'confident'
  | 'indifferent';

interface AnswerAnalysis {
  sentiment: AnswerSentiment;
  intent: UserIntent;
  keywords: string[];
  needsUpsell: boolean;
  needsConvincing: boolean;
  suggestedServices: string[];
  confidenceScore: number; // 0-100
  emotion: EmotionType;
  objectionType?: string;
  buyingSignals: string[];
  riskFactors: string[];
}

interface PersuasionStrategy {
  message: string;
  statistics?: string;
  benefits?: string[];
  urgency?: string | null;
  socialProof?: string;
  scarcity?: string | null;
  reciprocity?: string;
  anchoring?: string;
  riskReversal?: string;
  emotionalAppeal?: string;
}

interface ConversationContext {
  previousAnswers: string[];
  objectionCount: number;
  positiveResponses: number;
  topicsDiscussed: string[];
  buyingSignalsDetected: number;
  lastPersuasionAttempt?: number;
}

// Ключевые слова для определения настроения
const POSITIVE_KEYWORDS = [
  'да',
  'нужно',
  'хочу',
  'планирую',
  'интересно',
  'отлично',
  'хорошо',
  'конечно',
  'обязательно',
  'давайте',
  'согласен',
  'подходит',
  'нравится',
  'да, нужна',
  'да, планирую',
  'да, хочу',
  // hy / en
  'այո',
  'պետք',
  'ուզում',
  'հետաքրքիր',
  'լավ',
  'համաձայն',
  'yes',
  'need',
  'want',
  'interested',
  'good',
  'sure',
  'ok',
  'okay',
];

const NEGATIVE_KEYWORDS = [
  'нет',
  'не нужно',
  'не хочу',
  'не планирую',
  'не интересно',
  'дорого',
  'слишком',
  'не уверен',
  'сомневаюсь',
  'пока нет',
  'не сейчас',
  'не думаю',
  'не знаю',
  'может быть',
  'возможно',
  'некогда',
  'времени нет',
  'не разберусь',
  'слишком сложно',
  'не сейчас',
  'позже',
  'не готов',
  // hy / en
  'ոչ',
  'պետք չէ',
  'չեմ ուզում',
  'թանկ',
  'վստահ չեմ',
  'չգիտեմ',
  'հետո',
  'no',
  'not needed',
  'expensive',
  'not sure',
  'maybe later',
  'too complicated',
];

const UNCERTAIN_KEYWORDS = [
  'не знаю',
  'не уверен',
  'может быть',
  'возможно',
  'подумаю',
  'посмотрю',
  'не определился',
  'еще не решил',
  'сомневаюсь',
  'надо подумать',
  // hy / en
  'չգիտեմ',
  'վստահ չեմ',
  'միգուցե',
  'կմտածեմ',
  'maybe',
  'not sure',
  'perhaps',
  'i will think',
];

// Расширенный анализ ответа пользователя с эмоциями и сигналами покупки
export function analyzeUserAnswer(
  answer: string,
  context?: ConversationContext
): AnswerAnalysis {
  const lowerAnswer = answer.toLowerCase().trim();
  const words = lowerAnswer.split(/\s+/);
  const answerLength = answer.length;

  // Определение настроения с учетом контекста
  let sentiment: AnswerSentiment = 'neutral';
  const positiveCount = words.filter((w) =>
    POSITIVE_KEYWORDS.some((kw) => w.includes(kw))
  ).length;
  const negativeCount = words.filter((w) =>
    NEGATIVE_KEYWORDS.some((kw) => w.includes(kw))
  ).length;
  const uncertainCount = words.filter((w) =>
    UNCERTAIN_KEYWORDS.some((kw) => w.includes(kw))
  ).length;

  // Учет контекста предыдущих ответов
  const contextBoost = context?.positiveResponses || 0;
  const adjustedPositive = positiveCount + contextBoost * 0.5;

  if (adjustedPositive > negativeCount && adjustedPositive > uncertainCount) {
    sentiment = 'positive';
  } else if (negativeCount > adjustedPositive) {
    sentiment = 'negative';
  } else if (uncertainCount > 0) {
    sentiment = 'uncertain';
  }

  // Определение эмоции
  let emotion: EmotionType = 'indifferent';
  if (
    lowerAnswer.includes('отлично') ||
    lowerAnswer.includes('супер') ||
    lowerAnswer.includes('круто')
  ) {
    emotion = 'excited';
  } else if (
    lowerAnswer.includes('интересно') ||
    lowerAnswer.includes('расскажите') ||
    lowerAnswer.includes('как')
  ) {
    emotion = 'curious';
  } else if (
    lowerAnswer.includes('беспокоит') ||
    lowerAnswer.includes('опасения') ||
    lowerAnswer.includes('боюсь')
  ) {
    emotion = 'worried';
  } else if (
    lowerAnswer.includes('сомневаюсь') ||
    lowerAnswer.includes('не уверен') ||
    lowerAnswer.includes('может быть')
  ) {
    emotion = 'skeptical';
  } else if (
    lowerAnswer.includes('уверен') ||
    lowerAnswer.includes('точно') ||
    lowerAnswer.includes('решил')
  ) {
    emotion = 'confident';
  }

  // Определение намерения с учетом эмоций
  let intent: UserIntent = 'interested';
  if (sentiment === 'negative') {
    intent = 'objecting';
  } else if (sentiment === 'uncertain' || emotion === 'skeptical') {
    intent = 'hesitant';
  } else if (
    sentiment === 'positive' &&
    (answerLength > 20 || emotion === 'excited' || emotion === 'confident')
  ) {
    intent = 'ready_to_buy';
  }

  // Confidence Score (0-100)
  let confidenceScore = 50;
  if (sentiment === 'positive' && emotion === 'confident') confidenceScore = 90;
  else if (sentiment === 'positive' && emotion === 'excited')
    confidenceScore = 85;
  else if (sentiment === 'positive') confidenceScore = 70;
  else if (sentiment === 'uncertain' && emotion === 'curious')
    confidenceScore = 60;
  else if (sentiment === 'uncertain') confidenceScore = 40;
  else if (sentiment === 'negative' && emotion === 'worried')
    confidenceScore = 30;
  else if (sentiment === 'negative') confidenceScore = 20;

  // Извлечение ключевых слов
  const keywords = words.filter(
    (w) =>
      w.length > 3 &&
      ![
        'это',
        'для',
        'что',
        'как',
        'где',
        'когда',
        'кто',
        'почему',
        'может',
        'будет',
      ].includes(w)
  );

  // Определение типа возражения
  let objectionType: string | undefined;
  if (
    lowerAnswer.includes('дорого') ||
    lowerAnswer.includes('бюджет') ||
    lowerAnswer.includes('стоимость') ||
    lowerAnswer.includes('թանկ') ||
    lowerAnswer.includes('բյուջե') ||
    lowerAnswer.includes('արժե') ||
    lowerAnswer.includes('expensive') ||
    lowerAnswer.includes('budget') ||
    lowerAnswer.includes('cost')
  ) {
    objectionType = 'price';
  } else if (
    lowerAnswer.includes('времени') ||
    lowerAnswer.includes('некогда') ||
    lowerAnswer.includes('спешу') ||
    lowerAnswer.includes('ժամանակ') ||
    lowerAnswer.includes('no time')
  ) {
    objectionType = 'time';
  } else if (
    lowerAnswer.includes('сложно') ||
    lowerAnswer.includes('не разберусь') ||
    lowerAnswer.includes('трудно') ||
    lowerAnswer.includes('բարդ') ||
    lowerAnswer.includes('complicated')
  ) {
    objectionType = 'complexity';
  } else if (
    lowerAnswer.includes('не нужно') ||
    lowerAnswer.includes('не интересно') ||
    lowerAnswer.includes('не актуально') ||
    lowerAnswer.includes('պետք չէ') ||
    lowerAnswer.includes('not needed') ||
    lowerAnswer.includes('not interested')
  ) {
    objectionType = 'need';
  } else if (
    lowerAnswer.includes('конкуренты') ||
    lowerAnswer.includes('уже есть') ||
    lowerAnswer.includes('другая компания') ||
    lowerAnswer.includes('մրցակից') ||
    lowerAnswer.includes('competitor')
  ) {
    objectionType = 'competition';
  }

  // Сигналы покупки
  const buyingSignals: string[] = [];
  if (
    lowerAnswer.includes('когда') ||
    lowerAnswer.includes('сроки') ||
    lowerAnswer.includes('начать')
  ) {
    buyingSignals.push('timing_interest');
  }
  if (
    lowerAnswer.includes('сколько') ||
    lowerAnswer.includes('цена') ||
    lowerAnswer.includes('стоимость')
  ) {
    buyingSignals.push('price_inquiry');
  }
  if (
    lowerAnswer.includes('как работает') ||
    lowerAnswer.includes('процесс') ||
    lowerAnswer.includes('этапы')
  ) {
    buyingSignals.push('process_interest');
  }
  if (
    lowerAnswer.includes('гарантия') ||
    lowerAnswer.includes('поддержка') ||
    lowerAnswer.includes('риски')
  ) {
    buyingSignals.push('risk_assessment');
  }
  if (
    lowerAnswer.includes('примеры') ||
    lowerAnswer.includes('кейсы') ||
    lowerAnswer.includes('портфолио')
  ) {
    buyingSignals.push('proof_seeking');
  }
  if (
    lowerAnswer.includes('давайте') ||
    lowerAnswer.includes('начнем') ||
    lowerAnswer.includes('готов')
  ) {
    buyingSignals.push('readiness');
  }

  // Факторы риска
  const riskFactors: string[] = [];
  if (
    lowerAnswer.includes('подумаю') ||
    lowerAnswer.includes('посмотрю') ||
    lowerAnswer.includes('позже')
  ) {
    riskFactors.push('procrastination');
  }
  if (
    lowerAnswer.includes('дорого') ||
    lowerAnswer.includes('бюджет ограничен')
  ) {
    riskFactors.push('budget_constraint');
  }
  if (lowerAnswer.includes('не уверен') || lowerAnswer.includes('сомневаюсь')) {
    riskFactors.push('uncertainty');
  }
  if (
    lowerAnswer.includes('конкуренты') ||
    lowerAnswer.includes('другая компания')
  ) {
    riskFactors.push('competition');
  }

  // Определение потребности в upsell (расширенная логика)
  const needsUpsell =
    sentiment === 'positive' &&
    (lowerAnswer.includes('интеграция') ||
      lowerAnswer.includes('автоматизация') ||
      lowerAnswer.includes('аналитика') ||
      lowerAnswer.includes('маркетинг') ||
      lowerAnswer.includes('расширить') ||
      lowerAnswer.includes('дополнительно') ||
      buyingSignals.length > 2);

  // Определение потребности в убеждении (с учетом контекста)
  const needsConvincing =
    sentiment === 'negative' ||
    sentiment === 'uncertain' ||
    (sentiment === 'neutral' && emotion === 'skeptical') ||
    !!(context && context.objectionCount > 0);

  // Предлагаемые дополнительные услуги на основе расширенного анализа
  const suggestedServices: string[] = [];
  if (
    lowerAnswer.includes('продаж') ||
    lowerAnswer.includes('магазин') ||
    lowerAnswer.includes('товар')
  ) {
    suggestedServices.push(
      'Интеграция платежных систем',
      'Маркетинговая стратегия'
    );
  }
  if (
    lowerAnswer.includes('клиент') ||
    lowerAnswer.includes('заявк') ||
    lowerAnswer.includes('обращение')
  ) {
    suggestedServices.push('CRM интеграция', 'Автоматизация', 'Чат-боты');
  }
  if (
    lowerAnswer.includes('трафик') ||
    lowerAnswer.includes('посетител') ||
    lowerAnswer.includes('аудитория')
  ) {
    suggestedServices.push('Контент-маркетинг', 'SMM продвижение');
  }
  if (
    lowerAnswer.includes('мобильн') ||
    lowerAnswer.includes('телефон') ||
    lowerAnswer.includes('планшет')
  ) {
    suggestedServices.push(
      'Мобильная версия',
      'Адаптивный дизайн',
      'PWA приложение'
    );
  }
  if (
    lowerAnswer.includes('скорость') ||
    lowerAnswer.includes('производительность') ||
    lowerAnswer.includes('оптимизация')
  ) {
    suggestedServices.push('Техническая оптимизация', 'CDN', 'Кэширование');
  }
  if (
    lowerAnswer.includes('безопасность') ||
    lowerAnswer.includes('защита') ||
    lowerAnswer.includes('данные')
  ) {
    suggestedServices.push(
      'SSL сертификаты',
      'Защита от DDoS',
      'Резервное копирование'
    );
  }

  return {
    sentiment,
    intent,
    keywords,
    needsUpsell,
    needsConvincing,
    suggestedServices,
    confidenceScore,
    emotion,
    objectionType,
    buyingSignals,
    riskFactors,
  };
}

// Генерация стратегии убеждения
export function generatePersuasionStrategy(
  question: string,
  userAnswer: string,
  service: string,
  analysis: AnswerAnalysis
): PersuasionStrategy | null {
  if (!analysis.needsConvincing) {
    return null;
  }

  const lowerAnswer = userAnswer.toLowerCase();
  const lowerQuestion = question.toLowerCase();

  // Стратегии для разных типов возражений с расширенными техниками
  if (
    lowerAnswer.includes('дорого') ||
    lowerAnswer.includes('бюджет') ||
    lowerAnswer.includes('թանկ') ||
    lowerAnswer.includes('բյուջե') ||
    lowerAnswer.includes('expensive') ||
    lowerAnswer.includes('budget') ||
    analysis.objectionType === 'price'
  ) {
    const anchoring =
      'Многие сначала думают так же. Обычно после запуска становится понятно: сайт — это инструмент, который помогает получать заявки, а не просто «расход».';

    const riskReversal =
      'Мы начинаем с понятного плана и прозрачной сметы — без скрытых доплат. Если что-то не подходит, обсуждаем варианты до старта.';

    return {
      message:
        'Понимаю про бюджет. Давайте спокойно разберём, что реально нужно именно вам:',
      statistics:
        'Часто достаточно аккуратного первого этапа — без лишних функций. Это снижает старт и оставляет место для роста.',
      benefits: [
        'Можно начать с минимально нужного и расширять позже',
        'Мы подскажем, что даст результат сейчас, а что можно отложить',
        'Смета прозрачная — вы заранее видите, за что платите',
        'Бесплатная консультация поможет оценить задачу без обязательств',
      ],
      urgency: null,
      socialProof:
        'Многие клиенты начинают с небольшого бюджета и потом добавляют функции, когда уже идут заявки.',
      anchoring,
      riskReversal,
      scarcity: null,
      reciprocity:
        'Можем бесплатно разобрать задачу и предложить реалистичный вариант под ваш бюджет.',
    };
  }

  if (
    lowerAnswer.includes('не нужно') ||
    lowerAnswer.includes('не уверен') ||
    lowerAnswer.includes('пока нет') ||
    lowerAnswer.includes('պետք չէ') ||
    lowerAnswer.includes('վստահ չեմ') ||
    lowerAnswer.includes('not needed') ||
    lowerAnswer.includes('not sure') ||
    analysis.objectionType === 'need'
  ) {
    const emotionalAppeal =
      'Нормально сомневаться. Важно понять, что даст пользу сейчас, а что можно спокойно пропустить.';

    return {
      message:
        'Понимаю. Тогда давайте без давления — просто посмотрим, где это действительно помогает:',
      statistics:
        'Не все функции нужны сразу. Часто 2–3 правильных решения уже заметно упрощают работу с клиентами.',
      benefits: [
        'Выделитесь аккуратным и понятным сайтом',
        'Не потеряете заявки — форма и быстрый ответ помогают',
        'Меньше рутины, если часть процессов автоматизирована',
        'Можно стартовать просто и доработать позже',
      ],
      urgency: null,
      socialProof:
        'Клиенты часто говорят, что помогло именно ясное предложение и удобный способ связаться.',
      emotionalAppeal,
      scarcity: null,
      reciprocity:
        'Можем коротко подсказать, что имеет смысл именно в вашем случае — без обязательств.',
    };
  }

  if (
    lowerAnswer.includes('слишком сложно') ||
    lowerAnswer.includes('не разберусь')
  ) {
    return {
      message: 'Не переживайте — мы берём техническую часть на себя:',
      statistics:
        'Вы получаете готовый результат и понятные инструкции. Если что-то непонятно — помогаем.',
      benefits: [
        'Объясняем простым языком, без лишнего жаргона',
        'После запуска остаёмся на связи по вопросам',
        'Интерфейс делаем понятным для вас и ваших клиентов',
      ],
      urgency: null,
      socialProof:
        'С нами спокойно работают и те, кто далёк от «технички».',
    };
  }

  if (
    lowerAnswer.includes('не знаю') ||
    lowerAnswer.includes('не определился')
  ) {
    return {
      message:
        'Это нормально. Давайте вместе найдём подходящий вариант:',
      statistics:
        'Мы уже помогли многим компаниям выбрать формат под задачу и бюджет — без перегруза.',
      benefits: [
        'Короткая консультация: что нужно именно вам',
        'Несколько вариантов на выбор',
        'Честная смета под ваш бюджет',
      ],
      urgency: null,
      socialProof:
        'Нам важно, чтобы решение было понятным и посильным — не «ради галочки».',
    };
  }

  if (lowerAnswer.includes('времени нет') || lowerAnswer.includes('некогда')) {
    return {
      message:
        'Понимаю — времени всегда мало. Поэтому мы и берём работу на себя:',
      statistics:
        'Вам не нужно разбираться в деталях разработки: мы ведём процесс и держим в курсе.',
      benefits: [
        'Техническую часть закрываем мы',
        'Согласования короткие и по делу',
        'Вы получаете готовый результат без лишней нагрузки',
      ],
      urgency: null,
      socialProof:
        'Клиенты часто отмечают, что им не пришлось «сидеть в проекте» каждый день.',
    };
  }

  if (
    lowerAnswer.includes('конкуренты') ||
    lowerAnswer.includes('уже есть') ||
    analysis.objectionType === 'competition'
  ) {
    return {
      message:
        'Хорошо, что смотрите на рынок — значит, хотите сделать сильнее:',
      statistics:
        'Часто выигрывает не «самый дорогой» сайт, а понятный: чёткое предложение, удобная связь, нормальная скорость.',
      benefits: [
        'Аккуратный вид и ясное предложение',
        'Удобно оставить заявку с телефона',
        'Можно добавить то, чего нет у конкурентов — по делу, без лишнего',
      ],
      urgency: null,
      socialProof:
        'Клиенты отмечают, что помогает именно ясность и удобство — не «красивости ради красивостей».',
      scarcity: null,
      emotionalAppeal:
        'Достаточно сделать сайт понятнее и удобнее — и уже проще выделиться.',
    };
  }

  // Общая стратегия убеждения с расширенными техниками
  return {
    message:
      'Давайте коротко посмотрим, чем это может быть полезно вам:',
    statistics:
      'Обычно это помогает проще принимать заявки и спокойнее вести работу с клиентами.',
    benefits: [
      'Меньше рутины — больше времени на дело',
      'Удобнее связываться и не терять обращения',
      'Понятный сайт повышает доверие',
      'Можно расти поэтапно, без лишних затрат сразу',
    ],
    urgency: null,
    socialProof:
      'Клиенты ценят, когда всё просто, прозрачно и без перегруза функциями.',
    scarcity: null,
    reciprocity:
      'Можем бесплатно подсказать оптимальный вариант под вашу задачу.',
    emotionalAppeal:
      'Спокойный старт сегодня — меньше хаоса завтра.',
    riskReversal:
      'Мы фиксируем объём работ заранее и сопровождаем на всех этапах.',
  };
}

// Расширенная генерация upsell предложений с учетом контекста
export function generateUpsellProposal(
  service: string,
  chatData: ChatData,
  analysis: AnswerAnalysis,
  context?: ConversationContext
): string | null {
  // Не предлагаем upsell слишком часто
  if (
    context &&
    context.lastPersuasionAttempt &&
    Date.now() - context.lastPersuasionAttempt < 30000
  ) {
    return null;
  }

  // Предлагаем upsell только при положительном настроении или высоком confidence
  if (
    !analysis.needsUpsell &&
    analysis.sentiment !== 'positive' &&
    analysis.confidenceScore < 60
  ) {
    return null;
  }

  const suggestedServices = analysis.suggestedServices;
  if (suggestedServices.length === 0) {
    return null;
  }

  // Выбираем наиболее релевантный сервис на основе buying signals
  let upsellService = suggestedServices[0];
  if (analysis.buyingSignals.includes('process_interest')) {
    // Если интересуется процессом, предлагаем автоматизацию
    const automationService = suggestedServices.find((s) =>
      s.includes('Автоматизация')
    );
    if (automationService) upsellService = automationService;
  } else if (analysis.buyingSignals.includes('price_inquiry')) {
    // Если спрашивает о цене, предлагаем что-то с высокой ценностью
    const highValueService = suggestedServices.find(
      (s) => s.includes('Маркетинг')
    );
    if (highValueService) upsellService = highValueService;
  }

  const serviceBenefits: Record<string, string> = {
    'Интеграция платежных систем':
      'Оплата на сайте упрощает покупку: клиенту не нужно писать «как оплатить» — меньше потерянных заявок.',
    'CRM интеграция':
      'CRM помогает не терять заявки и быстрее отвечать клиентам — особенно когда обращений много.',
    Автоматизация:
      'Автоматизация снимает рутину: меньше ручного труда, быстрее ответы, спокойнее процесс.',
    'Контент-маркетинг':
      'Полезные материалы помогают людям лучше понять вас и чаще находить через поиск.',
    'Мобильная версия':
      'Большая часть людей заходит с телефона — удобная мобильная версия реально влияет на заявки.',
    'Адаптивный дизайн':
      'Сайт должен нормально открываться на телефоне — иначе часть клиентов просто уйдёт.',
    'Маркетинговая стратегия':
      'Чёткий план помогает тратить бюджет осознанно и понимать, что реально приносит клиентов.',
    'Чат-боты':
      'Чат помогает быстро отвечать на типовые вопросы и не терять тех, кто пишет вечером.',
    'SMM продвижение':
      'Соцсети помогают быть на виду и аккуратно приводить людей на сайт.',
    'PWA приложение':
      'PWA даёт ощущение приложения в браузере — удобно, если клиенты часто возвращаются.',
    'Техническая оптимизация':
      'Быстрый сайт приятнее для людей и лучше воспринимается поиском.',
    CDN: 'CDN помогает быстрее открывать сайт из разных городов и стран.',
    'SSL сертификаты':
      'HTTPS — базовое доверие: без него браузер пугает посетителей, а оплата и формы выглядят ненадёжно.',
    'Защита от DDoS':
      'Защита снижает риск, что сайт «ляжет» в пик нагрузки или при атаке.',
    'Резервное копирование':
      'Резервные копии — страховка: если что-то случится, можно быстро восстановить сайт.',
  };

  const benefit =
    serviceBenefits[upsellService] ||
    'Это может заметно усилить ваш проект — без лишней сложности.';

  const scarcity =
    Math.random() > 0.5
      ? ' Если берёте несколько услуг сразу — можем предложить более выгодный пакет.'
      : '';

  return `Кстати, вам может подойти ещё «${upsellService}». ${benefit}${scarcity} Рассказать подробнее?`;
}

// Расширенная генерация адаптированного ответа с учетом всех техник
export function generateAdaptiveResponse(
  question: string,
  userAnswer: string,
  service: string,
  chatData: ChatData,
  context?: ConversationContext
): string {
  const analysis = analyzeUserAnswer(userAnswer, context);
  const lowerAnswer = userAnswer.toLowerCase();

  // Если обнаружены сильные сигналы покупки, предлагаем следующий шаг
  if (analysis.buyingSignals.length >= 3 && analysis.confidenceScore > 70) {
    const nextStepMessages = [
      'Отлично — похоже, мы на одной волне. Давайте уточним детали и сроки.',
      'Хорошо. Готовы перейти к конкретным шагам и смете?',
      'Замечательно. Зафиксируем требования и подготовим понятное предложение.',
    ];
    return nextStepMessages[
      Math.floor(Math.random() * nextStepMessages.length)
    ];
  }

  // Если пользователь положительно настроен, можно предложить upsell (с умной логикой)
  if (
    analysis.sentiment === 'positive' &&
    analysis.needsUpsell &&
    analysis.confidenceScore > 60 &&
    (!context ||
      !context.lastPersuasionAttempt ||
      Date.now() - context.lastPersuasionAttempt > 60000)
  ) {
    const upsell = generateUpsellProposal(service, chatData, analysis, context);
    if (upsell) {
      return upsell;
    }
  }

  // Если нужна убеждение, генерируем расширенную стратегию
  if (analysis.needsConvincing) {
    const strategy = generatePersuasionStrategy(
      question,
      userAnswer,
      service,
      analysis
    );
    if (strategy) {
      let response = strategy.message + '\n\n';

      // Статистика
      if (strategy.statistics) {
        response += `📊 ${strategy.statistics}\n\n`;
      }

      // Преимущества
      if (strategy.benefits && strategy.benefits.length > 0) {
        response += '✨ Преимущества:\n';
        strategy.benefits.forEach((benefit, index) => {
          response += `${index + 1}. ${benefit}\n`;
        });
        response += '\n';
      }

      // Anchoring (если есть)
      if (strategy.anchoring) {
        response += `💎 ${strategy.anchoring}\n\n`;
      }

      // Risk Reversal (если есть)
      if (strategy.riskReversal) {
        response += `🛡️ ${strategy.riskReversal}\n\n`;
      }

      // Reciprocity (если есть)
      if (strategy.reciprocity) {
        response += `🎁 ${strategy.reciprocity}\n\n`;
      }

      // Urgency
      if (strategy.urgency) {
        response += `⏰ ${strategy.urgency}\n\n`;
      }

      // Scarcity
      if (strategy.scarcity) {
        response += `🔥 ${strategy.scarcity}\n\n`;
      }

      // Social Proof
      if (strategy.socialProof) {
        response += `💬 ${strategy.socialProof}\n\n`;
      }

      // Emotional Appeal
      if (strategy.emotionalAppeal) {
        response += `💝 ${strategy.emotionalAppeal}\n\n`;
      }

      // Адаптивный вопрос в конце в зависимости от типа возражения и эмоции
      if (
        analysis.objectionType === 'price' ||
        lowerAnswer.includes('дорого') ||
        lowerAnswer.includes('бюджет')
      ) {
        response +=
          'Можем подобрать вариант под ваш бюджет или сделать поэтапно. Что удобнее?';
      } else if (
        analysis.objectionType === 'need' ||
        lowerAnswer.includes('не знаю') ||
        lowerAnswer.includes('не определился')
      ) {
        response +=
          'Расскажите чуть подробнее о целях — подскажем, что реально стоит делать сейчас.';
      } else if (
        analysis.emotion === 'worried' ||
        analysis.riskFactors.includes('uncertainty')
      ) {
        response +=
          'Понимаю. Что больше всего смущает — сроки, бюджет или результат?';
      } else if (analysis.emotion === 'curious') {
        response += 'Что ещё важно уточнить перед решением?';
      } else {
        response +=
          'Как вам такой подход? Могу ответить на вопросы, если что-то осталось неясным.';
      }
      return response;
    }
  }

  // Если пользователь очень позитивно настроен, можно усилить энтузиазм
  if (analysis.sentiment === 'positive' && analysis.intent === 'ready_to_buy') {
    const positiveResponses = [
      'Отлично — хороший выбор для спокойного старта.',
      'Супер. Тогда двигаемся дальше по деталям.',
      'Отлично. Давайте уточним оставшиеся моменты.',
      'Хорошо. Похоже, мы готовы к следующему шагу.',
    ];
    return (
      positiveResponses[Math.floor(Math.random() * positiveResponses.length)] +
      ' Продолжим?'
    );
  }

  // Если пользователь проявляет любопытство, поддерживаем его
  if (analysis.emotion === 'curious' && analysis.buyingSignals.length > 0) {
    return 'Хорошо, что уточняете детали. Что ещё важно узнать?';
  }

  // Стандартный положительный ответ
  if (analysis.sentiment === 'positive') {
    return '';
  }

  // Нейтральный ответ - продолжаем диалог без дополнительных сообщений
  return '';
}

// Функция для создания контекста разговора
export function createConversationContext(
  messages: Array<{ text: string; sender: string }>
): ConversationContext {
  const userMessages = messages.filter((m) => m.sender === 'user');
  const previousAnswers = userMessages.map((m) => m.text);

  let objectionCount = 0;
  let positiveResponses = 0;
  const topicsDiscussed: string[] = [];
  let buyingSignalsDetected = 0;

  userMessages.forEach((msg) => {
    const lowerMsg = msg.text.toLowerCase();
    if (NEGATIVE_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      objectionCount++;
    }
    if (POSITIVE_KEYWORDS.some((kw) => lowerMsg.includes(kw))) {
      positiveResponses++;
    }

    // Извлечение тем
    if (lowerMsg.includes('продаж') || lowerMsg.includes('магазин'))
      topicsDiscussed.push('ecommerce');
    if (lowerMsg.includes('клиент') || lowerMsg.includes('заявк'))
      topicsDiscussed.push('crm');
    if (lowerMsg.includes('трафик') || lowerMsg.includes('посетител'))
      topicsDiscussed.push('traffic');
    if (lowerMsg.includes('мобильн')) topicsDiscussed.push('mobile');

    // Подсчет сигналов покупки
    if (lowerMsg.includes('когда') || lowerMsg.includes('сроки'))
      buyingSignalsDetected++;
    if (lowerMsg.includes('сколько') || lowerMsg.includes('цена'))
      buyingSignalsDetected++;
    if (lowerMsg.includes('как работает') || lowerMsg.includes('процесс'))
      buyingSignalsDetected++;
    if (lowerMsg.includes('гарантия') || lowerMsg.includes('поддержка'))
      buyingSignalsDetected++;
  });

  return {
    previousAnswers,
    objectionCount,
    positiveResponses,
    topicsDiscussed: [...new Set(topicsDiscussed)],
    buyingSignalsDetected,
  };
}

// Hook для использования AI продаж
export function useAISalesEngine() {
  return {
    analyzeUserAnswer,
    generatePersuasionStrategy,
    generateUpsellProposal,
    generateAdaptiveResponse,
    createConversationContext,
  };
}
