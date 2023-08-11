import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { NavBarText_JAP, FooterText_JAP, BusinessText_JAP } from '@/texts/ja';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <BusinessTemplate texts={BusinessText_JAP} />
    </Layout>
  );
};

export default business;
