import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityBoardTemplate from '@/components/templates/CommunityBoardTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';

export type CommunityBoardPropType = {
  urlLang: UrlLangType;
  userId: string;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    viewType: string;
  };
};

const Board = ({
  urlLang,
  userId,
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
  initialProps,
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
        initialProps={initialProps}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = Number(context.query.boardIndex);
  const page = Number(context.query.page) - 1 || 0;
  const topic = Number(context.query.topic) || 0;
  const viewType = (context.query.view as string) || 'all';

  const cookies = context.req.cookies;
  const userId = cookies.user_id || '';
  const boardLangCookie = (cookies.boardLang as BoardLangType) || 'ALL';

  const initialProps = { page, serverLang, boardLangCookie, topic, viewType };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLangCookie,
    topic,
    viewType
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, serverLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, serverLang);

  return {
    props: {
      urlLang,
      userId,
      boardLangCookie,
      initialProps,
      communityBoardData,
      communityBoardTopics,
      communityNoticeBannerData,
    },
  };
};

export default Board;
