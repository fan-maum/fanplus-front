import Layout from '@/components/layout/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_ESP, FooterText_ESP, BusinessText_ESP } from '@/texts/es';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <BusinessTemplate texts={BusinessText_ESP} />
    </Layout>
  );
};

export default business;
