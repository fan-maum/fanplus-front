import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_IND, FooterText_IND, BusinessText_IND } from '@/texts/in';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <BusinessPage texts={BusinessText_IND} />
    </Layout>
  );
};

export default business;
