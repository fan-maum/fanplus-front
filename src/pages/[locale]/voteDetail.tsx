import { getDailyVoteTicket, getVoteDetail } from '@/api/Vote';
import Layout from '@/components/organisms/Layout';
import VoteDetailLayout from '@/components/templates/VoteDetailLayout';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import { DailyVoteTicketResponse } from '@/types/vote';
import { isMobile } from '@/utils/userAgent';
import { AxiosError } from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import nookies from 'nookies';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const VoteDetail = ({
  urlLang,
  voteDetails,
  dailyTicketCount,
  headers,
  authCookie,
  url,
}: EventProps) => {
  const isWebView = false;
  const mobileWebView = isMobile(headers['user-agent']);

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
        dailyTicketCount={dailyTicketCount}
        headers={headers}
        authCookie={authCookie}
        isWebView={isWebView}
        mobileWebView={mobileWebView}
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
  const dailyTicketResponse: DailyVoteTicketResponse = await getDailyVoteTicket();
  const dailyTicketCount = dailyTicketResponse.RESULTS.DATAS.DAILY_VOTE_TICKET_COUNT;

  let voteDetails;
  try {
    voteDetails = await getVoteDetail(vote_IDX, serverLang);
  } catch (error) {
    if (error instanceof AxiosError) {
      const is4XXError = Math.floor((error.response?.status as number) / 100) === 4;
      if (is4XXError) return { notFound: true };
      throw new Error('Non-4XX Error occurs on voteDetail page');
    }
  }

  return {
    props: { urlLang, voteDetails, dailyTicketCount, headers, authCookie: authCookie || null, url },
  };
};

export default VoteDetail;
