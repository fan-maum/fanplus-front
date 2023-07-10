import MainPage from '@/components/mainPage/MainPage';
import MainPageText_ENG from '@/components/mainPage/texts/ENG';
import NavBarText_ENG from '@/components/layout/texts/ENG';
import Layout from '@/components/layout/Layout';
import { FooterText_KR } from '@/components/layout/texts/KR';

const EnglishHome = () => {
  const mainPageTexts = MainPageText_ENG;
  const navBarTexts = NavBarText_ENG;
  return (
    <Layout navBarTexts={navBarTexts} footerTexts={FooterText_KR}>
      <MainPage texts={mainPageTexts} />
    </Layout>
  );
};

export default EnglishHome;
