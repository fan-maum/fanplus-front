import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/organisms/Layout';
import { NavBarText_VIE, FooterText_VIE, MainPageText_VIE } from '@/texts/vi';

const VietNamHome = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <MainPageTemplate texts={MainPageText_VIE} />
    </Layout>
  );
};

export default VietNamHome;
