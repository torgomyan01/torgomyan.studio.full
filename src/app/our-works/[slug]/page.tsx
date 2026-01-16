import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MainTemplate from '@/components/common/main-template/main-template';
import { Works } from '@/utils/consts';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_project-detail.scss';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslation } from '@/i18n';
import { locales, defaultLocale } from '@/i18n/config';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = Works.find((w) => w.slug === slug);

  if (!project) {
    return {
      title: 'Проект не найден | Torgomyan.Studio',
    };
  }

  const locale = await getLocaleFromHeaders();
  const descriptionKey = `ourWorks.descriptions.${slug}`;
  const translatedDescription = getTranslation(locale, descriptionKey);
  const fallbackDescription = `Проект ${project.name}, разработанный командой Torgomyan.Studio. ${project.created}. Посмотрите пример нашей работы и результаты.`;
  const description =
    translatedDescription || project.description || fallbackDescription;

  const title = `${project.name} - Разработанный проект | Torgomyan.Studio`;

  const alternates: Metadata['alternates'] = {
    canonical: `https://torgomyan.studio/${locale === defaultLocale ? '' : `${locale}/`}our-works/${slug}`,
    languages: {},
  };

  for (const loc of locales) {
    alternates.languages![loc] =
      `https://torgomyan.studio/${loc === defaultLocale ? '' : `${loc}/`}our-works/${slug}`;
  }

  return {
    title,
    description,
    keywords: `${project.name}, веб-разработка, сайт, ${project.created}, портфолио, Torgomyan.Studio, пример сайта, разработанный сайт, кейс веб-разработки`,
    alternates,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: `/${project.imgUrl}`,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/${project.imgUrl}`],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = Works.find((w) => w.slug === slug);

  if (!project) {
    notFound();
  }

  const locale = await getLocaleFromHeaders();
  const descriptionKey = `ourWorks.descriptions.${slug}`;
  const translatedDescription = getTranslation(locale, descriptionKey);
  const projectDescription = translatedDescription || project.description || '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: projectDescription,
    creator: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
      url: 'https://torgomyan.studio',
    },
    image: `https://torgomyan.studio/${project.imgUrl}`,
    ...(project.links.length > 0 && {
      url: project.links[0].url,
    }),
  };

  return (
    <MainTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="project-detail-page">
        <div className="container">
          <div className="project-header">
            <div className="project-image-wrapper">
              <Image
                src={`/${project.imgUrl}`}
                alt={project.name}
                width={1200}
                height={600}
                className="project-main-image"
                priority
              />
            </div>
            <div className="project-info">
              <h1 className="project-title">{project.name}</h1>
              {projectDescription && (
                <p className="project-description">{projectDescription}</p>
              )}
              <div className="project-tech">
                <h3>Технологии:</h3>
                <p>{project.created}</p>
              </div>
            </div>
          </div>

          {project.links.length > 0 && (
            <div className="project-links-section">
              <h2>Ссылки на проект:</h2>
              <div className="project-links-grid">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-card"
                  >
                    <div className="link-content">
                      <span className="link-name">{link.name}</span>
                      <span className="link-url">{link.url}</span>
                    </div>
                    <i className="fas fa-external-link-alt" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="project-cta">
            <h2>Хотите такой же проект?</h2>
            <p>Свяжитесь с нами, и мы создадим для вас уникальное решение</p>
            <div className="cta-buttons">
              <Link href={SITE_URL.CONTACT} className="cta-button primary">
                Связаться с нами
              </Link>
              <Link href={SITE_URL.CALCULATOR} className="cta-button secondary">
                Рассчитать стоимость
              </Link>
            </div>
          </div>

          <div className="project-navigation">
            <Link href={SITE_URL.OUR_WORKS} className="back-link">
              ← Вернуться к портфолио
            </Link>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
