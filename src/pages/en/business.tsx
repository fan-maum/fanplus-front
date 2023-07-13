import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_ENG, FooterText_ENG, BusinessText_ENG } from '@/texts/en';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <BusinessPage texts={BusinessText_ENG} />
    </Layout>
  );
};

export default business;
