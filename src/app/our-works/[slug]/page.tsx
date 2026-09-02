import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MainTemplate from '@/components/common/main-template/main-template';
import { Works } from '@/utils/consts';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_project-detail.scss';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { defaultLocale } from '@/i18n/config';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslation, getTranslations } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import { buildLocalizedUrl, buildPageMetadata } from '@/utils/seo';

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
  const { locale, pathWithoutLocale } = await getPagePathContext(
    `/our-works/${slug}`
  );
  const t = getTranslations(locale);

  if (!project) {
    return {
      title: t.ourWorks.projectDetail.notFoundTitle,
    };
  }

  const descriptionKey = `ourWorks.descriptions.${slug}`;
  const translatedDescription = getTranslation(locale, descriptionKey);
  const fallbackDescription = t.ourWorks.projectDetail.fallbackDescription
    .replace('{{projectName}}', project.name)
    .replace('{{technologies}}', project.created);
  const description =
    translatedDescription || project.description || fallbackDescription;

  const title = t.ourWorks.projectDetail.titleTemplate.replace(
    '{{projectName}}',
    project.name
  );

  const keywords = t.ourWorks.projectDetail.keywordsTemplate
    .replace('{{projectName}}', project.name)
    .replace('{{technologies}}', project.created);

  const image = buildLocalizedUrl(`/${project.imgUrl}`, defaultLocale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title,
    description,
    keywords,
    image,
    imageAlt: project.name,
  });
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
  const t = getTranslations(locale);
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
      url: 'https://torgomyan-studio.am',
    },
    image: `https://torgomyan-studio.am/${project.imgUrl}`,
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
              {/* <div className="project-tech">
                <h3>{t.ourWorks.projectDetail.technologiesTitle}</h3>
                <p>{project.created}</p>
              </div> */}
            </div>
          </div>

          {project.links.length > 0 && (
            <div className="project-links-section">
              <h2>{t.ourWorks.projectDetail.projectLinksTitle}</h2>
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
            <h2>{t.ourWorks.projectDetail.ctaTitle}</h2>
            <p>{t.ourWorks.projectDetail.ctaDescription}</p>
            <div className="cta-buttons">
              <Link
                href={addLocaleToPath(SITE_URL.CONTACT, locale)}
                className="cta-button primary"
              >
                {t.ourWorks.projectDetail.contactButton}
              </Link>
              <Link
                href={addLocaleToPath(SITE_URL.CALCULATOR, locale)}
                className="cta-button secondary"
              >
                {t.ourWorks.projectDetail.calculateButton}
              </Link>
            </div>
          </div>

          <div className="project-navigation">
            <Link
              href={addLocaleToPath(SITE_URL.OUR_WORKS, locale)}
              className="back-link"
            >
              {t.ourWorks.projectDetail.backToPortfolio}
            </Link>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
