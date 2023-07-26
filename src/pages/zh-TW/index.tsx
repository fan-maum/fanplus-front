import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_TW, FooterText_zh_TW, MainPageText_zh_TW } from '@/texts/zh-TW';

const TaiwanHome = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <MainPageTemplate texts={MainPageText_zh_TW} />
    </Layout>
  );
};

export default TaiwanHome;
