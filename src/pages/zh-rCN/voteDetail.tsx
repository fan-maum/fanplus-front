import { InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_zh_rCN, NavBarText_zh_rCN } from '@/texts/zh-rCN';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const VoteDetail = ({ voteDetails, error }: EventProps) => {
  return (
    <Layout navBarTexts={NavBarText_zh_rCN} footerTexts={FooterText_zh_rCN}>
      <VoteDetailLayout voteDetails={voteDetails} error={error} />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const vote_IDX = context.query.vote_IDX;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/voteDetail?vote_IDX=${vote_IDX}&lang=zh`
  );
  const error = res.ok ? false : res.status;

  const voteDetails = await res.json();
  return {
    props: { voteDetails, error },
  };
};

export default VoteDetail;
