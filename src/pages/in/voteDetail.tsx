import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { FooterText_IND, NavBarText_IND } from '@/texts/in';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}
import nookies from 'nookies';
import { getVoteDetail } from '@/api/Vote';
import { NextSeo } from 'next-seo';

const VoteDetail = ({ voteDetails, headers, authCookie, error, url }: EventProps) => {
  const isWebView = !!headers.token || !!authCookie;

  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <NextSeo
        title={voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE}
        description={voteDetails.RESULTS.DATAS.VOTE_INFO.DESCRIPTION}
        canonical={url}
        openGraph={{
          title: voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE,
          type: 'website',
          url: url,
          siteName: '팬플러스(fanPlus)',
          description: voteDetails.RESULTS.DATAS.VOTE_INFO.DESCRIPTION,
          images: [
            {
              url: voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE_IMG,
            },
          ],
        }}
      />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}${context.resolvedUrl}`;
  const vote_IDX = context.query.vote_IDX;
  if (typeof vote_IDX !== 'string') {
    return {
      notFound: true,
    };
  }
  const headers = context.req.headers;
  const cookies = nookies.get(context);
  const authCookie = cookies['user_id'];
  const res = await getVoteDetail(vote_IDX, 'id');
  const voteDetails = res.data;
  const error = voteDetails ? false : res.status;
  return {
    props: { voteDetails, headers, error, authCookie: authCookie || null, url },
  };
};

export default VoteDetail;
