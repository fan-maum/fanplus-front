import { getVoteDetail } from '@/api/Vote';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import nookies from 'nookies';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const VoteDetail = ({ urlLang, voteDetails, headers, authCookie, url }: EventProps) => {
  const isWebView = false;

  return (
    <Layout urlLang={urlLang}>
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
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}${context.resolvedUrl}`;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const vote_IDX = context.query.vote_IDX;
  if (typeof vote_IDX !== 'string') {
    return { notFound: true };
  }
  const headers = context.req.headers;
  const cookies = nookies.get(context);
  const authCookie = cookies['user_id'];
  let res;
  try {
    res = await getVoteDetail(vote_IDX, serverLang);
  } catch (error) {
    console.error(`Error: getVoteDetail api
vote_IDX: ${vote_IDX}
lang: ${serverLang}`);
    throw new Error('getVoteDetail Error');
  }
  const voteDetails = res?.data;
  return {
    props: { urlLang, voteDetails, headers, authCookie: authCookie || null, url },
  };
};

export default VoteDetail;
