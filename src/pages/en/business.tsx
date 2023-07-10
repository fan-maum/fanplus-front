import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import NavBarText_ENG from '@/components/layout/texts/ENG';
import BusinessText_ENG from '@/components/businessPage/texts/ENG';
import { FooterText_KR } from '@/components/layout/texts/KR';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_KR}>
      <BusinessPage texts={BusinessText_ENG} />
    </Layout>
  );
};

export default business;
