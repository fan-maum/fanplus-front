import { getBookmarks, getCommunityBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardAllResponseType, PartialUserType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useQuery } from 'react-query';

export interface CommunityBoardPropTypes {
  queryParams: {
    urlLang: UrlLangType;
    userId: string;
    isAdminAccount: boolean;
    boardLangCookie: BoardLangType;
    maxPage: number;
  };
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
}

export interface CommunityBoardAllPropTypes {
  communityHomeSSRdata: CommunityBoardAllResponseType;
}

const CommunityHomePage = ({
  user,
  queryParams,
  communityHomeSSRdata,
  initialProps,
}: CommunityBoardPropTypes & { user: PartialUserType } & CommunityBoardAllPropTypes) => {
  const { urlLang, boardLangCookie } = queryParams;
  const { data } = useQuery(['bookmarks', { userId: queryParams.userId, urlLang }], () =>
    getBookmarks(queryParams.userId, urlLang)
  );
  const bookmarks = data ?? [];
  return (
    <CommunityMainLayout
      urlLang={urlLang}
      boardLangCookie={boardLangCookie}
      bookmarks={bookmarks}
      user={user}
      withSearchInput
      withBoardTab
    >
      <CommunityPageTemplate
        queryParams={queryParams}
        communityHomeSSRdata={communityHomeSSRdata}
        initialProps={initialProps}
      />
    </CommunityMainLayout>
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
  const HomeBoardType = 'community';

  const communityHomeSSRdata: CommunityBoardAllResponseType = await getCommunityBoardData(
    userId,
    HomeBoardType,
    page,
    perPage,
    serverLang,
    boardLangCookie,
    view_type,
    topic,
    maxPage
  );

  const queryParams = { urlLang, userId, isAdminAccount, boardLangCookie, maxPage };
  const initialProps = { page, serverLang, boardLangCookie, view_type, topic };

  const props = {
    queryParams,
    communityHomeSSRdata,
    initialProps,
  };

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default CommunityHomePage;
