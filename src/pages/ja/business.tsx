import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_JAP, FooterText_JAP, BusinessText_JAP } from '@/texts/ja';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <BusinessPage texts={BusinessText_JAP} />
    </Layout>
  );
};

export default business;
