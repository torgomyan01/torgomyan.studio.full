import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Link from 'next/link';
import '../_blog.scss';
import './_article.scss';

export const metadata: Metadata = {
  title: 'Как создать успешный лендинг-страницу | Torgomyan.Studio',
  description:
    'Пошаговое руководство по созданию эффективной лендинг-страницы, которая конвертирует посетителей в клиентов.',
  keywords:
    'лендинг страница, создание лендинга, эффективный лендинг, конверсия лендинга, как создать лендинг',
  alternates: {
    canonical: '/blog/kak-sozdat-uspeshnyj-lending',
  },
  openGraph: {
    title: 'Как создать успешный лендинг-страницу',
    description:
      'Пошаговое руководство по созданию эффективной лендинг-страницы',
    type: 'article',
  },
};

export default function SuccessfulLandingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Как создать успешный лендинг-страницу',
    description:
      'Пошаговое руководство по созданию эффективной лендинг-страницы',
    datePublished: '2024-12-18',
    author: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
  };

  return (
    <MainTemplate>
      <div className="article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="container">
          <div className="article-header">
            <Link href="/blog" className="back-link">
              ← Вернуться к блогу
            </Link>
            <div className="article-meta">
              <span className="article-category">Дизайн</span>
              <span className="article-date">
                {new Date('2024-12-18').toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="article-read-time">10 мин</span>
            </div>
            <h1 className="article-title">
              Как создать успешный лендинг-страницу
            </h1>
            <p className="article-subtitle">
              Пошаговое руководство по созданию эффективной лендинг-страницы,
              которая конвертирует посетителей в клиентов
            </p>
          </div>

          <div className="article-content">
            <section className="article-section">
              <h2>Что такое лендинг?</h2>
              <p>
                Лендинг (landing page) — это одностраничный сайт, созданный для
                достижения конкретной цели: продажи товара, сбора контактов,
                регистрации на мероприятие и т.д. Главное отличие лендинга от
                обычного сайта — фокус на одном действии пользователя.
              </p>
            </section>

            <section className="article-section">
              <h2>1. Определите цель и целевую аудиторию</h2>
              <p>Перед созданием лендинга четко определите:</p>
              <ul>
                <li>Какую цель должен достичь посетитель?</li>
                <li>Кто ваша целевая аудитория?</li>
                <li>Какие проблемы решает ваш продукт?</li>
                <li>Почему клиент должен выбрать именно вас?</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>2. Создайте цепляющий заголовок</h2>
              <p>Заголовок — это первое, что видит посетитель. Он должен:</p>
              <ul>
                <li>Привлекать внимание за 3-5 секунд</li>
                <li>Четко объяснять ценность предложения</li>
                <li>Быть понятным и конкретным</li>
                <li>Вызывать эмоциональный отклик</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>3. Структура лендинга</h2>
              <p>Эффективный лендинг включает следующие блоки:</p>
              <ul>
                <li>
                  <strong>Hero-секция:</strong> Заголовок, подзаголовок, CTA и
                  визуал
                </li>
                <li>
                  <strong>Проблема:</strong> Описание проблемы целевой аудитории
                </li>
                <li>
                  <strong>Решение:</strong> Как ваш продукт решает проблему
                </li>
                <li>
                  <strong>Преимущества:</strong> Ключевые выгоды для клиента
                </li>
                <li>
                  <strong>Социальное доказательство:</strong> Отзывы, кейсы,
                  статистика
                </li>
                <li>
                  <strong>Призыв к действию:</strong> Четкий и заметный CTA
                </li>
                <li>
                  <strong>FAQ:</strong> Ответы на частые вопросы
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>4. Дизайн и визуал</h2>
              <p>Правильный дизайн повышает конверсию:</p>
              <ul>
                <li>Минималистичный и чистый дизайн</li>
                <li>Качественные изображения и видео</li>
                <li>Контрастные цвета для CTA</li>
                <li>Адаптивность для мобильных устройств</li>
                <li>Быстрая загрузка страницы</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>5. Призывы к действию (CTA)</h2>
              <p>CTA должны быть заметными и мотивирующими:</p>
              <ul>
                <li>
                  Используйте активные глаголы: "Заказать", "Получить",
                  "Скачать"
                </li>
                <li>Создавайте срочность: "Ограниченное предложение"</li>
                <li>Размещайте CTA в нескольких местах страницы</li>
                <li>Делайте кнопки контрастными и заметными</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>6. Оптимизация конверсии</h2>
              <p>Для повышения конверсии:</p>
              <ul>
                <li>Упростите форму заявки (минимум полей)</li>
                <li>Добавьте социальные доказательства</li>
                <li>Используйте A/B тестирование</li>
                <li>Оптимизируйте скорость загрузки</li>
                <li>Убедитесь, что форма работает корректно</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>Заключение</h2>
              <p>
                Создание успешного лендинга требует понимания целевой аудитории,
                четкой структуры и постоянной оптимизации. Следуйте этим
                принципам, тестируйте различные варианты и анализируйте
                результаты.
              </p>
              <p>
                Нужна помощь с созданием эффективного лендинга? Свяжитесь с
                нами, и мы поможем создать страницу, которая конвертирует
                посетителей в клиентов.
              </p>
            </section>

            <div className="article-footer">
              <div className="article-tags">
                <span className="tag">Лендинг</span>
                <span className="tag">Конверсия</span>
                <span className="tag">Дизайн</span>
              </div>
              <Link href="/blog" className="back-to-blog">
                ← Вернуться к блогу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
