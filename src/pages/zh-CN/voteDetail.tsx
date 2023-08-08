import { InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_zh_CN, NavBarText_zh_CN } from '@/texts/zh-CN';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}
import nookies from 'nookies';

const VoteDetail = ({ voteDetails, headers, authCookie, error }: EventProps) => {
  const isWebView = !!headers.token || !!authCookie;

  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
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
  const authCookie = cookies['mk_cid'];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/voteDetail?vote_IDX=${vote_IDX}&lang=zh`
  );
  const error = res.ok ? false : res.status;

  const voteDetails = await res.json();
  return {
    props: { voteDetails, headers, error, authCookie: authCookie || null },
  };
};

export default VoteDetail;