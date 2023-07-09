import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import NavBarText_ENG from '@/components/layout/texts/ENG';
import BusinessText_ENG from '@/components/businessPage/texts/ENG';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG}>
      <BusinessPage texts={BusinessText_ENG} />
    </Layout>
  );
};

export default business;
