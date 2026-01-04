import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import Header from '@/components/layout/home/header/header';
import VideoBlock from '@/components/layout/home/video-block/video-block';
import OurWorks from '@/components/common/our-works/our-works';
import Reviews from '@/components/common/reviews/reviews';
import BlogPreview from '@/components/common/blog-preview/blog-preview';
import ContactUs from '@/components/common/contact-us/contact-us';

export default function Page() {
  return (
    <MainTemplate>
      <Header />

      <VideoBlock />

      <ServicesBlock />

      <OurWorks />

      <Reviews />

      <BlogPreview />

      <ContactUs />
    </MainTemplate>
  );
}
