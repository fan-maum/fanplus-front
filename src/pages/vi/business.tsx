import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_VIE, FooterText_VIE, BusinessText_VIE } from '@/texts/vi';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <BusinessTemplate texts={BusinessText_VIE} />
    </Layout>
  );
};

export default business;
