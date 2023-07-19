import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_KR, FooterText_KR, BusinessText_KR } from '@/texts/ko';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <BusinessTemplate texts={BusinessText_KR} />
    </Layout>
  );
};

export default business;
