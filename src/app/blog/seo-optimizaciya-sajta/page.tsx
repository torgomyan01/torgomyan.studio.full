import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Link from 'next/link';
import '../_blog.scss';
import './_article.scss';

export const metadata: Metadata = {
  title: 'SEO-оптимизация сайта: основы и практика | Torgomyan.Studio',
  description:
    'Полное руководство по SEO-оптимизации сайта. Узнайте, как повысить позиции в поисковых системах и привлечь органический трафик.',
  keywords:
    'SEO оптимизация, поисковая оптимизация, продвижение сайта, SEO основы, SEO практика, оптимизация для поисковых систем',
  alternates: {
    canonical: '/blog/seo-optimizaciya-sajta',
  },
  openGraph: {
    title: 'SEO-оптимизация сайта: основы и практика',
    description:
      'Полное руководство по SEO-оптимизации сайта для повышения позиций в поисковых системах',
    type: 'article',
  },
};

export default function SEOOptimizationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SEO-оптимизация сайта: основы и практика',
    description:
      'Полное руководство по SEO-оптимизации сайта для повышения позиций в поисковых системах',
    datePublished: '2024-12-20',
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
              <span className="article-category">SEO</span>
              <span className="article-date">
                {new Date('2024-12-20').toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="article-read-time">15 мин</span>
            </div>
            <h1 className="article-title">
              SEO-оптимизация сайта: основы и практика
            </h1>
            <p className="article-subtitle">
              Полное руководство по SEO-оптимизации сайта для повышения позиций
              в поисковых системах и привлечения органического трафика
            </p>
          </div>

          <div className="article-content">
            <section className="article-section">
              <h2>Что такое SEO?</h2>
              <p>
                SEO (Search Engine Optimization) — это комплекс мер по
                оптимизации сайта для поисковых систем с целью повышения его
                позиций в результатах поиска по целевым запросам. Правильная
                SEO-оптимизация помогает привлекать органический трафик и
                увеличивать количество потенциальных клиентов.
              </p>
            </section>

            <section className="article-section">
              <h2>1. Техническая SEO-оптимизация</h2>
              <p>
                Техническая оптимизация — это основа успешного SEO. Она
                включает:
              </p>
              <ul>
                <li>
                  <strong>Скорость загрузки:</strong> Быстрая загрузка страниц
                  положительно влияет на ранжирование
                </li>
                <li>
                  <strong>Мобильная адаптивность:</strong> Сайт должен корректно
                  отображаться на всех устройствах
                </li>
                <li>
                  <strong>HTTPS:</strong> Использование защищенного протокола
                  обязательно для современного сайта
                </li>
                <li>
                  <strong>Структурированные данные:</strong> Schema.org разметка
                  помогает поисковикам лучше понимать контент
                </li>
                <li>
                  <strong>XML Sitemap:</strong> Карта сайта упрощает индексацию
                </li>
                <li>
                  <strong>Robots.txt:</strong> Правильная настройка доступа для
                  поисковых роботов
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>2. Оптимизация контента</h2>
              <p>
                Качественный и оптимизированный контент — ключ к успеху в SEO:
              </p>
              <ul>
                <li>
                  <strong>Ключевые слова:</strong> Используйте релевантные
                  ключевые слова естественным образом
                </li>
                <li>
                  <strong>Заголовки:</strong> Правильная иерархия H1-H6 помогает
                  структурировать контент
                </li>
                <li>
                  <strong>Мета-теги:</strong> Title и Description должны быть
                  уникальными и привлекательными
                </li>
                <li>
                  <strong>Alt-теги:</strong> Оптимизация изображений для
                  поисковых систем
                </li>
                <li>
                  <strong>Внутренняя перелинковка:</strong> Связывайте
                  релевантные страницы между собой
                </li>
                <li>
                  <strong>Уникальность:</strong> Избегайте дублированного
                  контента
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>3. Внешние факторы</h2>
              <p>Внешние ссылки и упоминания также влияют на позиции сайта:</p>
              <ul>
                <li>
                  <strong>Обратные ссылки:</strong> Качественные ссылки с
                  авторитетных сайтов повышают доверие
                </li>
                <li>
                  <strong>Социальные сигналы:</strong> Активность в социальных
                  сетях может влиять на ранжирование
                </li>
                <li>
                  <strong>Локальное SEO:</strong> Для местного бизнеса важна
                  оптимизация для локального поиска
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>4. Аналитика и мониторинг</h2>
              <p>
                Регулярный мониторинг показателей помогает отслеживать
                эффективность SEO:
              </p>
              <ul>
                <li>Позиции по ключевым запросам</li>
                <li>Органический трафик</li>
                <li>Показатель отказов</li>
                <li>Время на сайте</li>
                <li>Конверсии из органического трафика</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>5. Частые ошибки в SEO</h2>
              <p>Избегайте этих распространенных ошибок:</p>
              <ul>
                <li>Переоптимизация ключевых слов</li>
                <li>Игнорирование мобильной версии</li>
                <li>Медленная загрузка страниц</li>
                <li>Дублированный контент</li>
                <li>Отсутствие структурированных данных</li>
                <li>Игнорирование локального SEO</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>Заключение</h2>
              <p>
                SEO-оптимизация — это долгосрочный процесс, который требует
                постоянной работы и мониторинга. Начните с технической
                оптимизации, затем работайте над контентом и внешними факторами.
                Регулярно анализируйте результаты и вносите улучшения.
              </p>
              <p>
                Если вам нужна помощь с SEO-оптимизацией вашего сайта,
                обращайтесь к нам. Мы проведем аудит и поможем повысить позиции
                в поисковых системах.
              </p>
            </section>

            <div className="article-footer">
              <div className="article-tags">
                <span className="tag">SEO</span>
                <span className="tag">Оптимизация</span>
                <span className="tag">Продвижение</span>
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
