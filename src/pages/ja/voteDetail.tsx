import { InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_JAP, NavBarText_JAP } from '@/texts/ja';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const VoteDetail = ({ voteDetails, error }: EventProps) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <VoteDetailLayout voteDetails={voteDetails} error={error} />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const vote_IDX = context.query.vote_IDX;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/voteDetail?vote_IDX=${vote_IDX}&lang=ja`
  );
  const error = res.ok ? false : res.status;

  const voteDetails = await res.json();
  return {
    props: { voteDetails, error },
  };
};

export default VoteDetail;