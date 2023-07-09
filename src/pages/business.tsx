import BusinessPage from '@/components/businessPage/BusinessPage';
import Layout from '@/components/layout/Layout';
import NavBarText_KR from '@/components/layout/texts/KR';
import BusinessText_KR from '@/components/businessPage/texts/KR';

const business = () => {
  return (
    <Layout navBarTexts={NavBarText_KR}>
      <BusinessPage texts={BusinessText_KR} />
    </Layout>
  );
};

export default business;
