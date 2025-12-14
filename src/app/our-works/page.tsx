import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';
import AllWorks from '@/components/common/all-works/all-works';

export const metadata: Metadata = {
  title:
    'Наши Работы - Портфолио Разработанных Сайтов и Веб-Приложений | Torgomyan.Studio',
  description:
    'Портфолио наших работ: более 30 успешно реализованных проектов. Сайты, интернет-магазины, веб-приложения и корпоративные решения. Посмотрите примеры наших работ.',
  keywords:
    'портфолио, наши работы, примеры сайтов, разработанные сайты, портфолио веб-студии, примеры работ, созданные сайты, веб-приложения примеры, интернет-магазины примеры',
  alternates: {
    canonical: '/our-works',
  },
  openGraph: {
    title: 'Наши Работы - Портфолио Разработанных Сайтов и Веб-Приложений',
    description:
      'Портфолио наших работ: более 30 успешно реализованных проектов. Сайты, интернет-магазины, веб-приложения и корпоративные решения.',
    type: 'website',
  },
};

export default function OurWorksPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Наши Работы - Портфолио',
    description:
      'Портфолио разработанных сайтов и веб-приложений Torgomyan.Studio',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Портфолио проектов',
    },
  };

  return (
    <MainTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicesHeaderWithContent
        title="Наши Работы"
        description="Мы гордимся каждым проектом, который создали. В нашем портфолио представлены более 30 успешно реализованных проектов: от простых лендингов до сложных веб-приложений и интернет-магазинов. Каждый проект — это результат тщательной работы, внимания к деталям и стремления к совершенству. Мы создаем не просто сайты, а цифровые решения, которые помогают бизнесу расти и развиваться."
      />

      <AllWorks />

      <ContactUs />
    </MainTemplate>
  );
}
