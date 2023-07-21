import Layout from '@/components/layout/Layout';
import { NavBarText_KR, FooterText_KR } from '@/texts/ko';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';

const VoteDetail = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <VoteDetailLayout />
    </Layout>
  );
};

export default VoteDetail;
