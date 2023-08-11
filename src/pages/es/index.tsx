import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/organisms/Layout';
import { NavBarText_ESP, FooterText_ESP, MainPageText_ESP } from '@/texts/es';

const EspanolHome = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <MainPageTemplate texts={MainPageText_ESP} />
    </Layout>
  );
};

export default EspanolHome;
