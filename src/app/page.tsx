import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import PromotionSection from '@/components/common/promotion-section/promotion-section';
import Header from '@/components/layout/home/header/header';
import VideoBlock from '@/components/layout/home/video-block/video-block';
import OurWorks from '@/components/common/our-works/our-works';
import Reviews from '@/components/common/reviews/reviews';
import ContactUs from '@/components/common/contact-us/contact-us';

export default function Page() {
  return (
    <MainTemplate>
      <div className="h-[100px]" />
      <Header />

      <PromotionSection />

      <ServicesBlock />

      {/* <VideoBlock /> */}

      <OurWorks />

      <Reviews />

      <ContactUs />
    </MainTemplate>
  );
}
