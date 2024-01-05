import BookmarkMenuItem from '@/components/molecules/community/BookmarkMenuItem';
import BookmarkListToggle from './BookmarkListToggle';
import NoBookmarkMessage from '@/components/molecules/community/NoBookMarkMessage';
import { getCookie } from '@/utils/Cookie';
import { useRouter } from 'next/router';
import { UrlLangType } from '@/types/common';
import { BookmarksItemType } from '@/types/community';

const MainBookmarkMenu = ({
  urlLang,
  bookmarks,
  bookmarkTitle,
}: {
  urlLang: UrlLangType;
  bookmarks: Array<BookmarksItemType>;
  bookmarkTitle: string;
}) => {
  const router = useRouter();
  const path = router.asPath;
  const user_id = getCookie('user_id');
  const handleBookmark = () => {
    if (!user_id) {
      router.push({ pathname: '/login', query: { nextUrl: path } });
    }
  };

  const hasBookmarkMenu = bookmarks?.length > 0;

  return (
    <div onClick={handleBookmark}>
      <BookmarkListToggle headerTitle={bookmarkTitle} isActive={Boolean(bookmarks?.length)}>
        <div>
          {hasBookmarkMenu ? (
            <div className="bookmark-list" style={{ fontSize: '13px' }}>
              {bookmarks.map((item) => (
                <BookmarkMenuItem
                  key={item.BOARD_IDX}
                  menuInfo={item}
                  user_id={user_id}
                  bookmarks={bookmarks}
                />
              ))}
            </div>
          ) : (
            <NoBookmarkMessage urlLang={urlLang} />
          )}
        </div>
      </BookmarkListToggle>
    </div>
  );
};

export default MainBookmarkMenu;
