import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_zh_CN, FooterText_zh_CN, BusinessText_zh_CN } from '@/texts/zh-CN';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <BusinessTemplate texts={BusinessText_zh_CN} />
    </Layout>
  );
};

export default business;
