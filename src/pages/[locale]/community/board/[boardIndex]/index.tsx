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
import type { BoardLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
  PartialUserType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { CommunityBoardPropTypes } from '../..';
import { useQuery } from 'react-query';

export interface BoardPropType extends CommunityBoardPropTypes {
  communityBoardSSRdata: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
}

const Board = ({
  queryParams,
  communityBoardSSRdata,
  communityBoardTopics,
  communityNoticeBannerData,
  initialProps,
  user,
}: BoardPropType & { user: PartialUserType }) => {
  const { urlLang, boardLangCookie } = queryParams;
  const { data } = useQuery(['bookmarks', { userId: queryParams.userId, urlLang }], () =>
    getBookmarks(queryParams.userId, urlLang)
  );
  const bookmarks = data ?? [];

  return (
    <>
      <CommunityMainLayout
        urlLang={urlLang}
        boardLangCookie={boardLangCookie}
        bookmarks={bookmarks}
        user={user}
        withSearchInput
        withBestNotices
        withBoardTab
      >
        <CommunityBoardTemplate
          queryParams={queryParams}
          communityBoardSSRdata={communityBoardSSRdata}
          communityBoardTopics={communityBoardTopics}
          communityNoticeBannerData={communityNoticeBannerData}
          initialProps={initialProps}
        />
      </CommunityMainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = context.req.cookies.user_id || '';
  const user_idx = context.req.cookies.user_idx;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 1;
  const perPage = 20;
  const maxPage = 10;
  const topic = parseInt(context.query.topic as string) || 0;
  const isAdminAccount = user_idx === process.env.ADMIN_ACCOUNT_IDX;
  const boardType = parseInt(context.query.boardIndex as string);

  if (!boardType) return { notFound: true };

  const communityBoardSSRdata: CommunityBoardResponseType = await getCommunityBoardData(
    userId,
    boardType,
    page,
    perPage,
    serverLang,
    boardLangCookie,
    view_type,
    topic,
    maxPage
  );

  const communityBoardTopics = await getCommunityBoardTopics(boardType, serverLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardType, serverLang);
  const queryParams = { urlLang, userId, isAdminAccount, boardLangCookie, maxPage };
  const initialProps = { page, serverLang, boardLangCookie, view_type, topic };
  const props = {
    queryParams,
    communityBoardSSRdata,
    communityBoardTopics,
    communityNoticeBannerData,
    initialProps,
  };

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default Board;
