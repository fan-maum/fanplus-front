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

export const getServerSideProps = async (context: any) => {
  const vote_type = context.query.vote_type || '';
  const page = context.query.page || 1;
  const per_page = Number(context.query.per_page) || 9;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/votes?vote_type=${vote_type}&page=${
      page - 1
    }&per_page=${per_page}&lang=ko`
  );
  const error = res.ok ? false : res.status;

  const voteLists = await res.json();
  return {
    props: { voteLists, error },
  };
};

export default VoteDetail;
