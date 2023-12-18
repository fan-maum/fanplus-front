import {
  getCommunityBoardCategoryData,
  getCommunityBoardData,
  getCommunityBoardResultData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardCategoryResponseType,
  CommunityBoardResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

type InitialBoardResultProps = {
  category_type: number;
  searchValue: string;
  serverLang: ServerLangType;
  page: number;
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
  initialProps: InitialBoardResultProps;
  userId: string;
  boardIndex: number;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  initialBestBoardProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
};

const CommunityHomePage = ({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
  userId,
  boardIndex,
  boardLangCookie,
  communityBoardData,
  initialBestBoardProps,
}: CommunityPropTypes) => {
  return (
    <CommunityMainLayout urlLang={urlLang}>
      {/* <CommunityPageTemplate
        urlLang={urlLang}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        initialProps={initialProps}
        userId={userId}
        boardIndex={boardIndex}
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData}
        initialBestBoardProps={initialBestBoardProps}
      /> */}
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || 0;
  const view_type = (context.query.view as string) || 'all';
  const boardIndex = 2291;

  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    serverLang,
    page,
    per_page
  );
  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLangCookie,
    topic,
    view_type
  );
  const initialProps = { category_type, searchValue, serverLang, page };
  const initialBestBoardProps = { page, serverLang, boardLangCookie, topic, view_type };

  return {
    props: {
      urlLang,
      boardCategoryData,
      boardResultData,
      initialProps,
      userId,
      boardIndex,
      boardLangCookie,
      communityBoardData,
      initialBestBoardProps,
    },
  };
};

export default CommunityHomePage;
