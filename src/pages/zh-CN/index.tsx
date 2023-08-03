import MainPageTemplate from '@/components/templates/MainPageTemplate';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, MainPageText_zh_CN } from '@/texts/zh-CN';

const ChinaHome = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <MainPageTemplate texts={MainPageText_zh_CN} />
    </Layout>
  );
};

export default ChinaHome;
