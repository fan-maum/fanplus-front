import {
  getCommunityBoardCategoryData,
  getCommunityBoardData,
  getCommunityBoardResultData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
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

<<<<<<< HEAD
export type CommunityPropTypes = {
  urlLang: UrlLangType;
  userId: string;
  isAdminAccount: boolean;
  boardLangCookie: BoardLangType;
  communityMainBoardDataSSR: CommunityMainPageResponseType;
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    maxPage: number;
    view_type: string;
  };
};

export interface CommunityBestBoardPropTypes {
  communityBoardDataSSR: CommunityBoardResponseType;
=======
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
>>>>>>> master
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
<<<<<<< HEAD
  userId,
  isAdminAccount,
  boardLangCookie,
  communityMainBoardDataSSR,
  initialProps,
  user,
  communityBoardDataSSR,
=======
  boardCategoryData,
  boardResultData,
  initialProps,
  userId,
  boardIndex,
  boardLangCookie,
  communityBoardData,
>>>>>>> master
  initialBestBoardProps,
}: CommunityPropTypes) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPageTemplate
        urlLang={urlLang}
<<<<<<< HEAD
        userId={userId}
        isAdminAccount={isAdminAccount}
        boardLangCookie={boardLangCookie}
        communityMainBoardDataSSR={communityMainBoardDataSSR}
        initialProps={initialProps}
        communityBoardDataSSR={communityBoardDataSSR}
=======
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        initialProps={initialProps}
        userId={userId}
        boardIndex={boardIndex}
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData}
>>>>>>> master
        initialBestBoardProps={initialBestBoardProps}
      />
    </Layout>
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

<<<<<<< HEAD
  const communityMainBoardDataSSR: CommunityMainPageResponseType = await getCommunityTypeBoardData(
    userId,
    'community',
    page,
    maxPage,
=======
  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
>>>>>>> master
    serverLang,
    page,
    per_page
  );
<<<<<<< HEAD

  const initialProps = { page, serverLang, boardLangCookie, maxPage, view_type };

  const communityBoardDataSSR = await getCommunityBoardData(
=======
  const communityBoardData = await getCommunityBoardData(
>>>>>>> master
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

<<<<<<< HEAD
  const props = {
    urlLang,
    userId,
    isAdminAccount,
    boardLangCookie,
    communityMainBoardDataSSR,
    initialProps,
    communityBoardDataSSR,
    initialBestBoardProps,
=======
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
>>>>>>> master
  };
};

export default CommunityHomePage;
