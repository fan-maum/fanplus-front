import Layout from '@/components/layout/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_zh_rTW, FooterText_zh_rTW, BusinessText_zh_rTW } from '@/texts/zh-rTW';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rTW} footerTexts={FooterText_zh_rTW}>
      <BusinessTemplate texts={BusinessText_zh_rTW} />
    </Layout>
  );
};

export default business;
