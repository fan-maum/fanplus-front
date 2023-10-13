import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityBoardTemplate from '@/components/templates/CommunityBoardTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import type { BoardLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityBoardPropType = {
  urlLang: UrlLangType;
  userId: string | null;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
};

const Board = ({
  urlLang,
  userId,
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityBoardTemplate
        urlLang={urlLang}
        userId={userId}
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        communityNoticeBannerData={communityNoticeBannerData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const urlLang = context.query.locale as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    backLang,
    boardLangCookie,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, backLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, backLang);

  return {
    props: {
      urlLang,
      userId,
      boardLangCookie,
      communityBoardData,
      communityBoardTopics,
      communityNoticeBannerData,
    },
  };
};

export default Board;
