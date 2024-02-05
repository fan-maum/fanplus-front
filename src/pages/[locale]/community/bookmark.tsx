import { getBookmarks, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import type { BoardLangType, UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import nookies from 'nookies';

const Bookmark = ({
  userId,
  urlLang,
  boardLangCookie,
  user,
}: {
  userId: string;
  urlLang: UrlLangType;
  boardLangCookie: BoardLangType;
  user: PartialUserType;
}) => {
  const { data } = useQuery(['bookmarks', { userId: userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
  );
  const bookmarks = data ?? [];
  const router = useRouter();
  const { boardIndex = 'bookmark' } = router.query;

  return (
    <>
      <CommunityMainLayout
        urlLang={urlLang}
        boardLangCookie={boardLangCookie}
        bookmarks={bookmarks}
        user={user}
        withSearchInput
        withBestNotices
      >
        <>bookmarks</>
      </CommunityMainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = context.req.cookies.user_id || '';
  const user_idx = context.req.cookies.user_idx;
  const urlLang = context.query.locale as UrlLangType;
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const props = {
    userId,
    urlLang,
    boardLangCookie,
  };

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default Bookmark;
