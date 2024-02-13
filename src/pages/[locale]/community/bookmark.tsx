import { getBookmarks, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import nookies from 'nookies';
import CommunityBookmarkTemplate from '@/components/templates/CommunityBookmarkTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';

export type BookmarkPropTypes = {
  queryParams: {
    urlLang: UrlLangType;
    userId: string;
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
};

const Bookmark = ({
  queryParams,
  initialProps,
  user,
}: BookmarkPropTypes & { user: PartialUserType }) => {
  const { urlLang, userId, boardLangCookie, maxPage } = queryParams;
  const { data } = useQuery(['bookmarks', { userId: userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
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
        <CommunityBookmarkTemplate
          queryParams={queryParams}
          initialProps={initialProps}
          bookmarks={bookmarks}
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
  const maxPage = 10;
  const topic = parseInt(context.query.topic as string) || 0;

  const queryParams = { urlLang, userId, boardLangCookie, maxPage };
  const initialProps = { page, serverLang, boardLangCookie, view_type, topic };
  const props = {
    queryParams,
    initialProps,
  };

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default Bookmark;
