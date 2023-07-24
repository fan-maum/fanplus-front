import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/organisms/Layout';
import { NavBarText_IND, FooterText_IND, MainPageText_IND } from '@/texts/in';

const IndonesiaHome = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <MainPageTemplate texts={MainPageText_IND} />
    </Layout>
  );
};

export default IndonesiaHome;
