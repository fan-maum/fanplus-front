import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_zh_rTW, FooterText_zh_rTW, BusinessText_zh_rTW } from '@/texts/zh-rTW';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rTW} footerTexts={FooterText_zh_rTW}>
      <BusinessPage texts={BusinessText_zh_rTW} />
    </Layout>
  );
};

export default business;
