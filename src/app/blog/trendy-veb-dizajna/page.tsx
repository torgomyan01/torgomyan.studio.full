import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Link from 'next/link';
import '../_blog.scss';
import './_article.scss';

export const metadata: Metadata = {
  title: 'Тренды веб-дизайна 2024 | Torgomyan.Studio',
  description:
    'Актуальные тренды в веб-дизайне на 2024 год. Что будет популярно и как создать современный сайт.',
  keywords:
    'тренды веб-дизайна, веб-дизайн 2024, современный дизайн, тренды дизайна, актуальный дизайн сайта',
  alternates: {
    canonical: '/blog/trendy-veb-dizajna',
  },
  openGraph: {
    title: 'Тренды веб-дизайна 2024',
    description: 'Актуальные тренды в веб-дизайне на 2024 год',
    type: 'article',
  },
};

export default function WebDesignTrendsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Тренды веб-дизайна 2024',
    description: 'Актуальные тренды в веб-дизайне на 2024 год',
    datePublished: '2024-12-12',
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
                {new Date('2024-12-12').toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="article-read-time">9 мин</span>
            </div>
            <h1 className="article-title">Тренды веб-дизайна 2024</h1>
            <p className="article-subtitle">
              Актуальные тренды в веб-дизайне на 2024 год. Что будет популярно и
              как создать современный сайт
            </p>
          </div>

          <div className="article-content">
            <section className="article-section">
              <h2>Введение</h2>
              <p>
                Веб-дизайн постоянно развивается, и каждый год приносит новые
                тренды. В 2024 году акцент делается на пользовательский опыт,
                доступность и визуальную привлекательность. Рассмотрим основные
                тренды этого года.
              </p>
            </section>

            <section className="article-section">
              <h2>1. Минимализм и чистота</h2>
              <p>Минималистичный дизайн продолжает быть актуальным:</p>
              <ul>
                <li>Много белого пространства</li>
                <li>Простая типографика</li>
                <li>Минимум элементов</li>
                <li>Фокус на контенте</li>
                <li>Чистые линии и формы</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>2. Темная тема (Dark Mode)</h2>
              <p>Темная тема стала стандартом:</p>
              <ul>
                <li>Снижает нагрузку на глаза</li>
                <li>Экономит заряд батареи</li>
                <li>Современный и стильный вид</li>
                <li>Переключение между светлой и темной темой</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>3. Градиенты и яркие цвета</h2>
              <p>Яркие градиенты и насыщенные цвета:</p>
              <ul>
                <li>Вибрантные цветовые палитры</li>
                <li>Плавные градиенты</li>
                <li>Неоновые акценты</li>
                <li>Смелые цветовые решения</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>4. Микроанимации</h2>
              <p>Небольшие анимации улучшают UX:</p>
              <ul>
                <li>Плавные переходы</li>
                <li>Интерактивные элементы</li>
                <li>Анимация при наведении</li>
                <li>Визуальная обратная связь</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>5. 3D элементы и иллюстрации</h2>
              <p>Трехмерные элементы добавляют глубину:</p>
              <ul>
                <li>3D иллюстрации</li>
                <li>Объемные иконки</li>
                <li>Интерактивные 3D модели</li>
                <li>Глубина и перспектива</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>6. Неоморфизм и стекломорфизм</h2>
              <p>Современные стили интерфейсов:</p>
              <ul>
                <li>
                  <strong>Неоморфизм:</strong> Мягкие тени, объемные элементы
                </li>
                <li>
                  <strong>Стекломорфизм:</strong> Полупрозрачные элементы с
                  размытием
                </li>
                <li>Современный и элегантный вид</li>
                <li>Тактильные ощущения</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>7. Адаптивность и мобильный-first</h2>
              <p>Мобильная версия в приоритете:</p>
              <ul>
                <li>Дизайн сначала для мобильных</li>
                <li>Идеальная адаптация под все экраны</li>
                <li>Touch-friendly интерфейсы</li>
                <li>Быстрая загрузка на мобильных</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>8. Доступность (Accessibility)</h2>
              <p>Дизайн для всех пользователей:</p>
              <ul>
                <li>Контрастные цвета</li>
                <li>Читаемые шрифты</li>
                <li>Поддержка скринридеров</li>
                <li>Удобная навигация</li>
                <li>Соответствие WCAG стандартам</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>Заключение</h2>
              <p>
                Современный веб-дизайн в 2024 году сочетает визуальную
                привлекательность с функциональностью и доступностью. Важно
                следовать трендам, но не забывать о пользовательском опыте и
                целях вашего сайта.
              </p>
              <p>
                Хотите создать современный сайт с актуальным дизайном? Свяжитесь
                с нами, и мы поможем воплотить ваши идеи в жизнь.
              </p>
            </section>

            <div className="article-footer">
              <div className="article-tags">
                <span className="tag">Дизайн</span>
                <span className="tag">Тренды</span>
                <span className="tag">2024</span>
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
