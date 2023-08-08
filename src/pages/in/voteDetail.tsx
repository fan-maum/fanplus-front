import { InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_IND, NavBarText_IND } from '@/texts/in';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}
import nookies from 'nookies';

const VoteDetail = ({ voteDetails, headers, authCookie, error }: EventProps) => {
  const isWebView = !!headers.token || !!authCookie;

  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/voteDetail?vote_IDX=${vote_IDX}&lang=id`
  );
  const error = res.ok ? false : res.status;

  const voteDetails = await res.json();
  return {
    props: { voteDetails, headers, error, authCookie: authCookie || null },
  };
};

export default VoteDetail;
