import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_ENG, FooterText_ENG, BusinessText_ENG } from '@/texts/en';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <BusinessTemplate texts={BusinessText_ENG} />
    </Layout>
  );
};

export default business;
