import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import Header from '@/components/layout/home/header/header';
import HowWeWork from '@/components/common/how-we-work/how-we-work';
import PersonalIntro from '@/components/common/personal-intro/personal-intro';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import HomePageSchema from '@/components/common/structured-data/home-page-schema';

export default function Page() {
  return (
    <MainTemplate>
      <HomePageSchema />
      <Header />
      <HowWeWork />
      <ServicesBlock />
      <PersonalIntro />
      <OurWorks />
      <ContactUs />
    </MainTemplate>
  );
}
