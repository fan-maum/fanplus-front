import {
  getBookmarks,
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
  getUser,
} from '@/api/Community';
import CommunityBoardTemplate from '@/components/templates/CommunityBoardTemplate';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  BookmarksResponseType,
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
  PartialUserType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityBoardPropType = {
  urlLang: UrlLangType;
  userId: string;
  isAdminAccount: boolean;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
  bookmarksData: BookmarksResponseType;
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
};

const Board = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
  initialProps,
  bookmarksData,
  user,
}: CommunityBoardPropType & { user: PartialUserType }) => {
  return (
    <>
      <CommunityMainLayout
        urlLang={urlLang}
        user={user}
        bookmarksData={bookmarksData}
        withSearchInput
      >
        <CommunityBoardTemplate
          urlLang={urlLang}
          userId={userId}
          isAdminAccount={isAdminAccount}
          boardLangCookie={boardLangCookie}
          communityBoardData={communityBoardData}
          communityBoardTopics={communityBoardTopics}
          communityNoticeBannerData={communityNoticeBannerData}
          bookmarksData={bookmarksData}
          initialProps={initialProps}
        />
      </CommunityMainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const userIdx = cookies['user_idx'] || '';
  const isAdminAccount = userIdx === process.env.ADMIN_ACCOUNT_IDX;

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) || 1;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || 0;
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLangCookie,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, serverLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, serverLang);
  const initialProps = { page, serverLang, boardLangCookie, topic, view_type };

  let bookmarksData;
  if (userId === '') {
    bookmarksData = { SUBSCRIPTION_BOARDS: [] };
  } else {
    bookmarksData = await getBookmarks(userId, urlLang);
  }

  const props = {
    urlLang,
    userId,
    isAdminAccount,
    boardLangCookie,
    communityBoardData,
    communityBoardTopics,
    communityNoticeBannerData,
    bookmarksData,
    initialProps,
  };

  if (!!userId && !!userIdx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, userIdx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default Board;
