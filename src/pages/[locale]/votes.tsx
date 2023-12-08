import { getDailyVoteTicket } from '@/api/Vote';
import TopVoteAdBar from '@/components/molecules/TopVoteAdBar';
import Layout from '@/components/organisms/Layout';
import VotesLayout from '@/components/templates/VoteLayout';
import { topNavHeight } from '@/global/constant';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import { DailyVoteTicketResponse } from '@/types/vote';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ urlLang, voteLists, dailyTicketCount, error }: EventProps) => {
  const topAdBarState = useState(false);
  const [opened] = topAdBarState;
  // eslint-disable-next-line no-console
  console.log(dailyTicketCount);

  return (
    <>
      <TopVoteAdBar topAdBarState={topAdBarState} dailyTicketCount={dailyTicketCount} />
      <div
        css={{
          paddingTop: opened ? topNavHeight : 0,
          '@media screen and (max-width: 991px)': {
            paddingTop: opened ? topNavHeight + 20 : 0,
          },
        }}
      >
        <Layout urlLang={urlLang}>
          <VotesLayout voteLists={voteLists} error={error} opened={opened} />
        </Layout>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const vote_type = context.query.vote_type || '';
  const page = Number(context.query.page) - 1 || 0;
  const per_page = Number(context.query.per_page) || 9;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/votes?vote_type=${vote_type}&page=${page}&per_page=${per_page}&lang=${serverLang}`
  );
  const error = res.ok ? false : res.status;
  const dailyTicketResponse: DailyVoteTicketResponse = await getDailyVoteTicket();
  const dailyTicketCount = dailyTicketResponse.RESULTS.DATAS.DAILY_VOTE_TICKET_COUNT;

  const voteLists = await res.json();
  return {
    props: { urlLang, voteLists, dailyTicketCount, error },
  };
};

export default Votes;
