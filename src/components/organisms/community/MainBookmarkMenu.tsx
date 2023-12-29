import BookmarkMenuItem from '@/components/molecules/community/BookmarkMenuItem';
import BookmarkListToggle from './BookmarkListToggle';
import NoBookmarkMessage from '@/components/molecules/community/NoBookMarkMessage';
import { getBookmarks, getUser } from '@/api/Community';
import { getCookie } from '@/utils/Cookie';
import { useRouter } from 'next/router';
import { UrlLangType } from '@/types/common';
import { useGetBookmarksQuery, useGetBookmarksQueryProps } from '@/server/query';

const MainBookmarkMenu = ({
  urlLang,
}: {
  urlLang: string;
  // urlLang: UrlLangType => 나중에 소진님 API 수정 후 고쳐야댐
}) => {
  const router = useRouter();
  const user_id = 'bb11558d6cb4694c9f77938137fb909c879e23d88ed2decd231751007a390a6e';
  // const user_id = getCookie('user_id');

  const useGetBookmarksQueryProps: useGetBookmarksQueryProps = {
    identity: user_id,
    lang: 'ko_KR',
  };

  const { data, isFetched } = useGetBookmarksQuery(useGetBookmarksQueryProps);

  const handleBookmark = () => {
    if (!user_id) {
      router.push('/login');
    }
  };

  const hasBookmarkMenu = data && data?.SUBSCRIPTION_BOARDS.length > 0;
  return (
    <div onClick={handleBookmark}>
      <BookmarkListToggle
        headerTitle="즐겨찾기"
        isActive={Boolean(data?.SUBSCRIPTION_BOARDS.length)}
      >
        <div>
          {hasBookmarkMenu ? (
            <div className="bookmark-list" style={{ fontSize: '13px' }}>
              {data?.SUBSCRIPTION_BOARDS.map((item) => (
                <BookmarkMenuItem key={item.BOARD_IDX} menuInfo={item} />
              ))}
            </div>
          ) : (
            <NoBookmarkMessage />
          )}
        </div>
      </BookmarkListToggle>
    </div>
  );
};

export default MainBookmarkMenu;
