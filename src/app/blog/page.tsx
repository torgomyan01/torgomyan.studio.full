import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Link from 'next/link';
import './_blog.scss';

export const metadata: Metadata = {
  title: 'Блог - Полезные статьи о веб-разработке и SEO | Torgomyan.Studio',
  description:
    'Полезные статьи о создании сайтов, выборе веб-студии, SEO-оптимизации и веб-разработке. Экспертные советы от профессионалов.',
  keywords:
    'блог о веб-разработке, статьи о создании сайтов, как выбрать веб-студию, ошибки при создании сайта, SEO статьи, веб-дизайн статьи',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Блог - Статьи о веб-разработке и SEO',
    description:
      'Полезные статьи о создании сайтов, выборе веб-студии и веб-разработке',
    type: 'website',
  },
};

const articles = [
  {
    slug: 'kak-vybrat-veb-studiyu',
    title: 'Как выбрать веб-студию',
    description:
      'Руководство по выбору надежной веб-студии для вашего проекта. На что обратить внимание при выборе подрядчика.',
    date: '2024-12-15',
    readTime: '8 мин',
    category: 'Советы',
  },
  {
    slug: '10-oshibok-pri-sozdanii-sajta',
    title: '10 ошибок при создании сайта',
    description:
      'Топ-10 распространенных ошибок, которые допускают при создании сайта. Как избежать проблем и создать успешный проект.',
    date: '2024-12-10',
    readTime: '12 мин',
    category: 'Ошибки',
  },
  {
    slug: 'seo-optimizaciya-sajta',
    title: 'SEO-оптимизация сайта: основы и практика',
    description:
      'Полное руководство по SEO-оптимизации сайта. Узнайте, как повысить позиции в поисковых системах и привлечь органический трафик.',
    date: '2024-12-20',
    readTime: '15 мин',
    category: 'SEO',
  },
  {
    slug: 'kak-sozdat-uspeshnyj-lending',
    title: 'Как создать успешный лендинг-страницу',
    description:
      'Пошаговое руководство по созданию эффективной лендинг-страницы, которая конвертирует посетителей в клиентов.',
    date: '2024-12-18',
    readTime: '10 мин',
    category: 'Дизайн',
  },
  {
    slug: 'kak-vybrat-cms',
    title: 'Как выбрать CMS для вашего сайта',
    description:
      'Сравнение популярных CMS систем. Какую платформу выбрать для вашего проекта: WordPress, Tilda, Webflow или кастомная разработка?',
    date: '2024-12-16',
    readTime: '12 мин',
    category: 'Технологии',
  },
  {
    slug: 'optimizaciya-skorosti-sajta',
    title: 'Оптимизация скорости загрузки сайта',
    description:
      'Практические советы по ускорению сайта. Как уменьшить время загрузки и улучшить пользовательский опыт.',
    date: '2024-12-14',
    readTime: '11 мин',
    category: 'Оптимизация',
  },
  {
    slug: 'trendy-veb-dizajna',
    title: 'Тренды веб-дизайна 2024',
    description:
      'Актуальные тренды в веб-дизайне на 2024 год. Что будет популярно и как создать современный сайт.',
    date: '2024-12-12',
    readTime: '9 мин',
    category: 'Дизайн',
  },
];

export default function BlogPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Блог Torgomyan.Studio',
    description: 'Полезные статьи о веб-разработке и SEO',
    publisher: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      url: `https://torgomyan.studio/blog/${article.slug}`,
    })),
  };

  return (
    <MainTemplate>
      <div className="blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="container">
          <div className="blog-header">
            <h1 className="main-title">Блог</h1>
            <p className="blog-subtitle">
              Полезные статьи о веб-разработке, создании сайтов и
              SEO-оптимизации
            </p>
          </div>

          <div className="blog-articles">
            {articles.map((article) => (
              <article key={article.slug} className="blog-article-card">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">
                    {new Date(article.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                <h2 className="article-title">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="article-description">{article.description}</p>
                <Link href={`/blog/${article.slug}`} className="article-link">
                  Читать далее →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
