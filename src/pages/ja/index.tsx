import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/layout/Layout';
import { NavBarText_JAP, FooterText_JAP, MainPageText_JAP } from '@/texts/ja';

const JapanHome = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <MainPageTemplate texts={MainPageText_JAP} />
    </Layout>
  );
};

export default JapanHome;
