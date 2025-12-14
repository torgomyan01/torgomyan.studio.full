import Navbar from '@/components/common/navbar/navbar';
import Footer from '../footer/footer';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      {children}

      <Footer />
    </>
  );
}

export default MainTemplate;
