import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import Header from '@/components/layout/home/header/header';
import HowWeWork from '@/components/common/how-we-work/how-we-work';
import CaseStudies from '@/components/common/case-studies/case-studies';
import OurWorks from '@/components/common/our-works/our-works';
import Reviews from '@/components/common/reviews/reviews';
import ContactUs from '@/components/common/contact-us/contact-us';

export default function Page() {
  return (
    <MainTemplate>
      <Header />
      <HowWeWork />
      <ServicesBlock />
      <CaseStudies />
      <OurWorks />
      <Reviews />
      <ContactUs />
    </MainTemplate>
  );
}
