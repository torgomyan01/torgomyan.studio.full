import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Link from 'next/link';
import '../_blog.scss';
import './_article.scss';

export const metadata: Metadata = {
  title: 'Оптимизация скорости загрузки сайта | Torgomyan.Studio',
  description:
    'Практические советы по ускорению сайта. Как уменьшить время загрузки и улучшить пользовательский опыт.',
  keywords:
    'оптимизация скорости сайта, ускорение сайта, скорость загрузки, производительность сайта, оптимизация производительности',
  alternates: {
    canonical: '/blog/optimizaciya-skorosti-sajta',
  },
  openGraph: {
    title: 'Оптимизация скорости загрузки сайта',
    description:
      'Практические советы по ускорению сайта и улучшению производительности',
    type: 'article',
  },
};

export default function SiteSpeedOptimizationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Оптимизация скорости загрузки сайта',
    description:
      'Практические советы по ускорению сайта и улучшению производительности',
    datePublished: '2024-12-14',
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
              <span className="article-category">Оптимизация</span>
              <span className="article-date">
                {new Date('2024-12-14').toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="article-read-time">11 мин</span>
            </div>
            <h1 className="article-title">
              Оптимизация скорости загрузки сайта
            </h1>
            <p className="article-subtitle">
              Практические советы по ускорению сайта и улучшению
              пользовательского опыта
            </p>
          </div>

          <div className="article-content">
            <section className="article-section">
              <h2>Почему скорость важна?</h2>
              <p>Скорость загрузки сайта напрямую влияет на:</p>
              <ul>
                <li>Пользовательский опыт и удовлетворенность</li>
                <li>
                  Позиции в поисковых системах (Google учитывает скорость)
                </li>
                <li>Конверсию (медленный сайт = потеря клиентов)</li>
                <li>Показатель отказов</li>
                <li>Время на сайте</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>1. Оптимизация изображений</h2>
              <p>
                Изображения часто занимают большую часть трафика. Оптимизируйте
                их:
              </p>
              <ul>
                <li>
                  <strong>Сжатие:</strong> Используйте современные форматы
                  (WebP, AVIF)
                </li>
                <li>
                  <strong>Размеры:</strong> Загружайте изображения нужного
                  размера, не больше
                </li>
                <li>
                  <strong>Ленивая загрузка:</strong> Загружайте изображения по
                  мере прокрутки
                </li>
                <li>
                  <strong>CDN:</strong> Используйте CDN для быстрой доставки
                  изображений
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>2. Минификация и сжатие</h2>
              <p>Уменьшите размер файлов:</p>
              <ul>
                <li>
                  <strong>CSS и JavaScript:</strong> Минифицируйте код, удаляйте
                  пробелы и комментарии
                </li>
                <li>
                  <strong>Gzip/Brotli:</strong> Включите сжатие на сервере
                </li>
                <li>
                  <strong>Удаление неиспользуемого кода:</strong> Очистите от
                  лишних библиотек и плагинов
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>3. Кэширование</h2>
              <p>Кэширование позволяет хранить ресурсы локально:</p>
              <ul>
                <li>
                  <strong>Браузерное кэширование:</strong> Настройте заголовки
                  Cache-Control
                </li>
                <li>
                  <strong>Серверное кэширование:</strong> Используйте Redis или
                  Memcached
                </li>
                <li>
                  <strong>CDN кэширование:</strong> Распределенная сеть доставки
                  контента
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>4. Оптимизация загрузки</h2>
              <p>Улучшите процесс загрузки:</p>
              <ul>
                <li>
                  <strong>Асинхронная загрузка:</strong> Загружайте скрипты
                  асинхронно
                </li>
                <li>
                  <strong>Отложенная загрузка:</strong> Defer для некритичных
                  скриптов
                </li>
                <li>
                  <strong>Критический CSS:</strong> Загружайте важный CSS инлайн
                </li>
                <li>
                  <strong>Preload/Prefetch:</strong> Предзагрузка важных
                  ресурсов
                </li>
              </ul>
            </section>

            <section className="article-section">
              <h2>5. Выбор хостинга</h2>
              <p>Качественный хостинг — основа скорости:</p>
              <ul>
                <li>Выбирайте хостинг с SSD дисками</li>
                <li>Используйте CDN для статического контента</li>
                <li>Рассмотрите VPS для больших проектов</li>
                <li>Проверяйте географическое расположение серверов</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>6. Мониторинг и тестирование</h2>
              <p>Регулярно проверяйте скорость:</p>
              <ul>
                <li>Google PageSpeed Insights</li>
                <li>GTmetrix</li>
                <li>WebPageTest</li>
                <li>Chrome DevTools</li>
              </ul>
            </section>

            <section className="article-section">
              <h2>Заключение</h2>
              <p>
                Оптимизация скорости сайта — это непрерывный процесс. Начните с
                самых важных элементов: изображений, кэширования и выбора
                хостинга. Регулярно тестируйте и улучшайте производительность.
              </p>
              <p>
                Нужна помощь с оптимизацией скорости вашего сайта? Свяжитесь с
                нами, и мы проведем аудит и ускорим ваш сайт.
              </p>
            </section>

            <div className="article-footer">
              <div className="article-tags">
                <span className="tag">Оптимизация</span>
                <span className="tag">Производительность</span>
                <span className="tag">Скорость</span>
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
