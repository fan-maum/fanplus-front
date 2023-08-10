import { InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_zh_TW, NavBarText_zh_TW } from '@/texts/zh-TW';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}
import nookies from 'nookies';
import { getVoteDetail } from '@/api/Vote';

const VoteDetail = ({ voteDetails, headers, authCookie, error }: EventProps) => {
  const isWebView = !!headers.token || !!authCookie;

  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <VoteDetailLayout
        voteDetails={voteDetails}
        headers={headers}
        authCookie={authCookie}
        isWebView={isWebView}
        error={error}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const vote_IDX = context.query.vote_IDX;
  const headers = context.req.headers;
  const cookies = nookies.get(context);
  const authCookie = cookies['user_id'];

  const res = await getVoteDetail(vote_IDX, 'zhtw');
  const voteDetails = res.data;
  const error = voteDetails ? false : res.status;
  return {
    props: { voteDetails, headers, error, authCookie: authCookie || null },
  };
};

export default VoteDetail;
