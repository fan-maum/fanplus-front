import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_IND, FooterText_IND, BusinessText_IND } from '@/texts/in';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <BusinessTemplate texts={BusinessText_IND} />
    </Layout>
  );
};

export default business;
