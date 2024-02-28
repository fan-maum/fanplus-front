import { getBookmarks, getCommunityBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { BoardLangType, UrlLangType } from '@/types/common';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import type { CommunityBoardMyPostResponseType, PartialUserType } from '@/types/community';
import { useQuery } from 'react-query';
export interface MyPostPageProps {
  urlLang: UrlLangType;
  userId: string;
  user_idx: number;
  communityMyPostData: CommunityBoardMyPostResponseType;
}

const MyPostPage = ({
  urlLang,
  boardLangCookie,
  userId,
  user_idx,
  communityMyPostData,
  user,
}: MyPostPageProps & { user: PartialUserType } & { boardLangCookie: BoardLangType }) => {
  const { data } = useQuery(['bookmarks', { userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
  );
  const bookmarks = data ?? [];

  return (
    <CommunityMainLayout
      urlLang={urlLang}
      boardLangCookie={boardLangCookie}
      bookmarks={bookmarks}
      user={user}
      withBestNotices
    >
      <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityMyPostData={communityMyPostData}
        user_idx={user_idx}
      />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = context.req.cookies.user_id || null;
  const user_idx = context.req.cookies.user_idx || null;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 1;
  const perPage = 20;
  const maxPage = 10;
  const topic = parseInt(context.query.topic as string) || 0;
  const boardType = 'myPost';

  const communityMyPostData = await getCommunityBoardData(
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

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return {
      props: { urlLang, boardLangCookie, userId: userId, user_idx, communityMyPostData, user },
    };
  }
  return {
    props: {
      urlLang,
      boardLangCookie,
      userId: userId,
      user_idx,
      communityMyPostData,
    },
  };
};

export default MyPostPage;
