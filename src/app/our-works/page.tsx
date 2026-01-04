import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';
import AllWorks from '@/components/common/all-works/all-works';

export const metadata: Metadata = {
  title:
    'Портфолио - Примеры Разработанных Сайтов | Наши Работы | Torgomyan.Studio',
  description:
    'Портфолио наших работ: более 100 успешно реализованных проектов. Примеры сайтов, интернет-магазинов, лендингов и веб-приложений. Посмотрите кейсы и результаты наших клиентов.',
  keywords:
    'портфолио веб-студии, примеры сайтов, наши работы, разработанные сайты, портфолио разработки сайтов, примеры интернет-магазинов, кейсы веб-разработки, примеры лендингов, созданные сайты примеры, портфолио веб-приложений',
  alternates: {
    canonical: 'https://torgomyan.studio/our-works',
  },
  openGraph: {
    title: 'Портфолио - Примеры Разработанных Сайтов | Наши Работы',
    description:
      'Портфолио наших работ: более 100 успешно реализованных проектов. Примеры сайтов, интернет-магазинов, лендингов и веб-приложений.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
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
        description="Мы гордимся каждым проектом, который создали. В нашем портфолио представлены более 60 успешно реализованных проектов: от простых лендингов до сложных веб-приложений и интернет-магазинов. Каждый проект — это результат тщательной работы, внимания к деталям и стремления к совершенству. Мы создаем не просто сайты, а цифровые решения, которые помогают бизнесу расти и развиваться."
      />

      <AllWorks />

      <ContactUs />
    </MainTemplate>
  );
}
