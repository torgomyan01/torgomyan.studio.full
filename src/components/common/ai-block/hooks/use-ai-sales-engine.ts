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
  scarcity?: string;
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
    lowerAnswer.includes('стоимость')
  ) {
    objectionType = 'price';
  } else if (
    lowerAnswer.includes('времени') ||
    lowerAnswer.includes('некогда') ||
    lowerAnswer.includes('спешу')
  ) {
    objectionType = 'time';
  } else if (
    lowerAnswer.includes('сложно') ||
    lowerAnswer.includes('не разберусь') ||
    lowerAnswer.includes('трудно')
  ) {
    objectionType = 'complexity';
  } else if (
    lowerAnswer.includes('не нужно') ||
    lowerAnswer.includes('не интересно') ||
    lowerAnswer.includes('не актуально')
  ) {
    objectionType = 'need';
  } else if (
    lowerAnswer.includes('конкуренты') ||
    lowerAnswer.includes('уже есть') ||
    lowerAnswer.includes('другая компания')
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
      'SEO продвижение',
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
    suggestedServices.push(
      'SEO продвижение',
      'Контент-маркетинг',
      'SMM продвижение'
    );
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
    analysis.objectionType === 'price'
  ) {
    // Anchoring - показываем более высокую ценность
    const anchoring =
      'Многие наши клиенты сначала думали так же, но после внедрения они поняли, что это не расход, а инвестиция, которая приносит 500-1000% ROI.';

    // Risk Reversal - снижаем риски
    const riskReversal =
      'Мы настолько уверены в результате, что предлагаем гарантию возврата средств, если вы не увидите роста в первые 3 месяца.';

    return {
      message:
        'Понимаю ваши опасения по поводу бюджета! Но давайте посмотрим на это с другой стороны:',
      statistics:
        'Инвестиция в правильные инструменты окупается в среднем за 3-6 месяцев и увеличивает доход на 200-500%.',
      benefits: [
        'Это долгосрочная инвестиция в рост вашего бизнеса',
        'Автоматизация экономит до 20 часов в неделю - это время можно потратить на развитие',
        'Правильные инструменты увеличивают конверсию и окупаются многократно',
        'ROI составляет 500-1000% в первый год',
      ],
      urgency:
        'Каждый день без правильных инструментов - это потерянные клиенты и упущенные возможности.',
      socialProof:
        'Наши клиенты увеличивают продажи в среднем на 300% в первые 6 месяцев.',
      anchoring,
      riskReversal,
      scarcity:
        'Сейчас действует специальное предложение для новых клиентов - скидка 20% при заказе до конца месяца.',
      reciprocity:
        'Мы можем предложить бесплатную консультацию и аудит вашего бизнеса на 50000₽ - это поможет вам увидеть реальную ценность решения.',
    };
  }

  if (
    lowerAnswer.includes('не нужно') ||
    lowerAnswer.includes('не уверен') ||
    lowerAnswer.includes('пока нет') ||
    analysis.objectionType === 'need'
  ) {
    // Emotional Appeal - обращение к эмоциям
    const emotionalAppeal =
      'Представьте, как будет выглядеть ваш бизнес через год с правильными инструментами - больше клиентов, больше продаж, меньше стресса.';

    return {
      message:
        'Понимаю, что вы еще не уверены. Давайте рассмотрим, что вы получаете:',
      statistics:
        'Компании, которые используют [эту функцию], увеличивают эффективность на 40-60% по сравнению с теми, кто этого не делает.',
      benefits: [
        'Это поможет вам выделиться среди конкурентов',
        'Улучшит клиентский опыт и увеличит лояльность',
        'Автоматизирует рутинные задачи и сэкономит время',
        'Откроет новые возможности для роста и масштабирования',
      ],
      urgency:
        'Ваши конкуренты уже используют эти инструменты - не отставайте!',
      socialProof:
        '9 из 10 наших клиентов говорят, что это было одно из лучших решений для их бизнеса.',
      emotionalAppeal,
      scarcity:
        'У нас ограниченное количество мест для новых проектов в этом месяце - осталось всего 3 места.',
      reciprocity:
        'Мы можем провести бесплатный анализ вашего бизнеса и показать конкретные возможности роста - без обязательств с вашей стороны.',
    };
  }

  if (
    lowerAnswer.includes('слишком сложно') ||
    lowerAnswer.includes('не разберусь')
  ) {
    return {
      message: 'Не волнуйтесь! Мы сделаем все максимально просто для вас:',
      statistics:
        'Наша команда обеспечивает полную поддержку и обучение - вы будете чувствовать себя уверенно.',
      benefits: [
        'Мы предоставляем подробные инструкции и обучение',
        'Наша команда поддержки всегда готова помочь',
        'Интерфейс интуитивно понятен и прост в использовании',
      ],
      urgency: null,
      socialProof:
        'Даже клиенты без технического опыта успешно используют наши решения.',
    };
  }

  if (
    lowerAnswer.includes('не знаю') ||
    lowerAnswer.includes('не определился')
  ) {
    return {
      message:
        'Это нормально! Давайте вместе разберемся, что будет лучше для вашего бизнеса:',
      statistics:
        'Мы помогли более 500 компаниям найти оптимальные решения для их задач.',
      benefits: [
        'Мы проведем бесплатную консультацию и анализ ваших потребностей',
        'Предложим несколько вариантов на выбор',
        'Поможем выбрать оптимальное решение для вашего бюджета',
      ],
      urgency: null,
      socialProof:
        'Наши клиенты ценят наш индивидуальный подход и профессиональные рекомендации.',
    };
  }

  if (lowerAnswer.includes('времени нет') || lowerAnswer.includes('некогда')) {
    return {
      message:
        'Понимаю, что время - это ценный ресурс! Именно поэтому автоматизация так важна:',
      statistics:
        'Автоматизация экономит до 20 часов в неделю - это время можно потратить на развитие бизнеса.',
      benefits: [
        'Мы возьмем всю техническую работу на себя',
        'Вы получите готовое решение без необходимости разбираться в деталях',
        'Экономия времени окупит инвестицию уже в первый месяц',
      ],
      urgency: 'Чем дольше откладывать, тем больше времени теряется впустую.',
      socialProof:
        'Наши клиенты отмечают, что после внедрения у них появилось больше времени на стратегические задачи.',
    };
  }

  if (
    lowerAnswer.includes('конкуренты') ||
    lowerAnswer.includes('уже есть') ||
    analysis.objectionType === 'competition'
  ) {
    return {
      message:
        'Отлично, что вы думаете о конкурентах! Это значит, что вы хотите быть лучше:',
      statistics:
        'Компании, которые инвестируют в современные решения, обгоняют конкурентов на 200-300% по эффективности.',
      benefits: [
        'Вы получите конкурентное преимущество',
        'Улучшите клиентский опыт и выделитесь на рынке',
        'Сможете предлагать то, чего нет у конкурентов',
        'Станете лидером в своей нише',
      ],
      urgency: 'Пока вы думаете, ваши конкуренты уже внедряют новые решения.',
      socialProof:
        'Наши клиенты часто говорят, что это решение помогло им обогнать конкурентов.',
      scarcity:
        'Мы работаем только с ограниченным количеством клиентов в каждой нише, чтобы обеспечить максимальное качество.',
      emotionalAppeal:
        'Быть первым - это не только престижно, но и выгодно. Ранние последователи получают максимальные преимущества.',
    };
  }

  // Общая стратегия убеждения с расширенными техниками
  return {
    message:
      'Давайте рассмотрим преимущества этого решения для вашего бизнеса:',
    statistics:
      'Это может увеличить эффективность вашего бизнеса на 30-50% и улучшить клиентский опыт.',
    benefits: [
      'Поможет автоматизировать процессы и сэкономить время',
      'Улучшит взаимодействие с клиентами',
      'Увеличит конверсию и продажи',
      'Создаст основу для долгосрочного роста',
    ],
    urgency:
      'Чем раньше вы начнете, тем быстрее увидите результаты и рост бизнеса.',
    socialProof:
      'Наши клиенты отмечают значительное улучшение показателей уже в первый месяц.',
    scarcity:
      'Мы можем взять только ограниченное количество проектов, чтобы обеспечить качество.',
    reciprocity:
      'Мы предлагаем бесплатную консультацию и анализ - это поможет вам принять правильное решение.',
    emotionalAppeal:
      'Инвестируя в правильные инструменты сегодня, вы строите успешное будущее для своего бизнеса.',
    riskReversal:
      'Мы настолько уверены в результате, что предлагаем гарантию качества и поддержку на всех этапах.',
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
      (s) => s.includes('SEO') || s.includes('Маркетинг')
    );
    if (highValueService) upsellService = highValueService;
  }

  const serviceBenefits: Record<string, string> = {
    'Интеграция платежных систем':
      'Интеграция платежных систем может увеличить конверсию на 30-50% и автоматизировать обработку платежей. Это критически важно для роста продаж!',
    'SEO продвижение':
      'SEO продвижение может увеличить органический трафик на 500-1000% и привлечь целевых клиентов без постоянных затрат на рекламу.',
    'CRM интеграция':
      'CRM интеграция автоматизирует обработку заявок, увеличивает скорость ответа в 5 раз и улучшает конверсию на 40%.',
    Автоматизация:
      'Автоматизация может увеличить эффективность бизнеса на 300-500% и сэкономить до 20 часов в неделю.',
    'Контент-маркетинг':
      'Контент-маркетинг увеличивает трафик на 434% и помогает позиционировать вас как эксперта в своей области.',
    'Мобильная версия':
      '70% покупок совершается с мобильных устройств - мобильная версия может удвоить ваши продажи!',
    'Адаптивный дизайн':
      '60% трафика идет с мобильных - без адаптивного дизайна вы теряете большинство клиентов.',
    'Маркетинговая стратегия':
      'Правильная маркетинговая стратегия может увеличить продажи на 200-400% и оптимизировать рекламный бюджет.',
    'Чат-боты':
      'Чат-боты обрабатывают до 80% запросов автоматически и увеличивают конверсию на 25-30%.',
    'SMM продвижение':
      'SMM продвижение увеличивает узнаваемость бренда на 80% и привлекает новую аудиторию.',
    'PWA приложение':
      'PWA приложения работают как нативные приложения и увеличивают вовлеченность на 200%.',
    'Техническая оптимизация':
      'Техническая оптимизация увеличивает скорость сайта на 70% и улучшает позиции в поиске на 20-30%.',
    CDN: 'CDN ускоряет загрузку сайта на 50-70% и улучшает пользовательский опыт.',
    'SSL сертификаты':
      'SSL обязателен для безопасности и доверия - сайты без SSL теряют 64% посетителей.',
    'Защита от DDoS':
      'Защита от DDoS предотвращает 99% атак и обеспечивает стабильную работу сайта.',
    'Резервное копирование':
      'Автоматическое резервное копирование предотвращает потерю данных и защищает ваш бизнес.',
  };

  const benefit =
    serviceBenefits[upsellService] ||
    'Это может значительно улучшить результаты вашего проекта.';

  // Добавляем scarcity и urgency для upsell
  const scarcity =
    Math.random() > 0.5
      ? ' Кстати, сейчас действует специальное предложение при заказе нескольких услуг одновременно.'
      : '';

  return `Отлично! Кстати, я заметил, что вам может быть интересна также "${upsellService}". ${benefit}${scarcity} Хотите узнать больше об этой услуге?`;
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
      'Отлично! Я вижу, что вы серьезно настроены. Давайте обсудим детали реализации и сроки.',
      'Превосходно! Вы задаете правильные вопросы. Готовы перейти к обсуждению конкретных шагов?',
      'Замечательно! Давайте зафиксируем ваши требования и подготовим индивидуальное предложение.',
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
          'Может быть, мы можем обсудить варианты, которые подходят вашему бюджету? Или рассмотреть поэтапную реализацию? Что вы думаете?';
      } else if (
        analysis.objectionType === 'need' ||
        lowerAnswer.includes('не знаю') ||
        lowerAnswer.includes('не определился')
      ) {
        response +=
          'Давайте я помогу вам разобраться. Можете рассказать больше о ваших целях и задачах? Мы найдем оптимальное решение вместе.';
      } else if (
        analysis.emotion === 'worried' ||
        analysis.riskFactors.includes('uncertainty')
      ) {
        response +=
          'Понимаю ваши опасения. Давайте обсудим все риски и как мы их минимизируем. Что вас больше всего беспокоит?';
      } else if (analysis.emotion === 'curious') {
        response +=
          'Отлично, что вы задаете вопросы! Это показывает серьезный подход. Что еще вас интересует?';
      } else {
        response +=
          'Что вы думаете? Может быть, стоит рассмотреть этот вариант более детально? Я готов ответить на все ваши вопросы.';
      }
      return response;
    }
  }

  // Если пользователь очень позитивно настроен, можно усилить энтузиазм
  if (analysis.sentiment === 'positive' && analysis.intent === 'ready_to_buy') {
    const positiveResponses = [
      'Отлично! Вы делаете правильный выбор для роста вашего бизнеса! 🚀',
      'Превосходно! Это решение поможет вам достичь новых высот! 💪',
      'Замечательно! Вы на правильном пути к успеху! ✨',
      'Великолепно! Я вижу, что вы готовы к росту! 🌟',
    ];
    return (
      positiveResponses[Math.floor(Math.random() * positiveResponses.length)] +
      ' Давайте продолжим и обсудим детали!'
    );
  }

  // Если пользователь проявляет любопытство, поддерживаем его
  if (analysis.emotion === 'curious' && analysis.buyingSignals.length > 0) {
    return 'Отлично, что вы интересуетесь деталями! Это важный шаг к принятию правильного решения. Что еще вас интересует?';
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
