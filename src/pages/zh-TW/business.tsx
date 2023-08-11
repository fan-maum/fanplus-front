import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_zh_TW, FooterText_zh_TW, BusinessText_zh_TW } from '@/texts/zh-TW';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <BusinessTemplate texts={BusinessText_zh_TW} />
    </Layout>
  );
};

export default business;
