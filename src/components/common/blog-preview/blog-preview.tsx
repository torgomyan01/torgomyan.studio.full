import Link from 'next/link';
import './_blog-preview.scss';

const featuredArticles = [
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
    slug: 'seo-optimizaciya-sajta',
    title: 'SEO-оптимизация сайта: основы и практика',
    description:
      'Полное руководство по SEO-оптимизации сайта. Узнайте, как повысить позиции в поисковых системах и привлечь органический трафик.',
    date: '2024-12-20',
    readTime: '15 мин',
    category: 'SEO',
  },
];

export default function BlogPreview() {
  return (
    <div className="blog-preview">
      <div className="container">
        <h2 className="main-title">Блог</h2>
        <p className="main-subtitle">
          Полезные статьи о веб-разработке, создании сайтов и SEO-оптимизации
        </p>
        <div className="blog-preview-articles">
          {featuredArticles.map((article) => (
            <article key={article.slug} className="blog-preview-card">
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
              <h3 className="article-title">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="article-description">{article.description}</p>
              <Link href={`/blog/${article.slug}`} className="article-link">
                Читать далее →
              </Link>
            </article>
          ))}
        </div>
        <Link href="/blog" className="show-all-blog">
          <span>Смотреть все статьи</span>
          <img src="/images/link-arrow.svg" alt="" />
        </Link>
      </div>
    </div>
  );
}
