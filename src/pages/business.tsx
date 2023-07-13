import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_KR, FooterText_KR, BusinessText_KR } from '@/texts/ko';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <BusinessPage texts={BusinessText_KR} />
    </Layout>
  );
};

export default business;
