import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_VIE, FooterText_VIE, BusinessText_VIE } from '@/texts/vi';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <BusinessPage texts={BusinessText_VIE} />
    </Layout>
  );
};

export default business;
