import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_ESP, FooterText_ESP, BusinessText_ESP } from '@/texts/es';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <BusinessPage texts={BusinessText_ESP} />
    </Layout>
  );
};

export default business;
