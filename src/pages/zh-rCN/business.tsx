import Layout from '@/components/layout/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_zh_rCN, FooterText_zh_rCN, BusinessText_zh_rCN } from '@/texts/zh-rCN';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rCN} footerTexts={FooterText_zh_rCN}>
      <BusinessTemplate texts={BusinessText_zh_rCN} />
    </Layout>
  );
};

export default business;
