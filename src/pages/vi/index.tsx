import MainPage from '@/components/mainPage/MainPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_VIE, FooterText_VIE, MainPageText_VIE } from '@/texts/vi';

const VietNamHome = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <MainPage texts={MainPageText_VIE} />
    </Layout>
  );
};

export default VietNamHome;
