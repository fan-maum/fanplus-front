import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/layout/Layout';
import { NavBarText_ENG, FooterText_ENG, MainPageText_ENG } from '@/texts/en';

const EnglishHome = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <MainPageTemplate texts={MainPageText_ENG} />
    </Layout>
  );
};

export default EnglishHome;
