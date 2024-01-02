import BookmarkMenuItem from '@/components/molecules/community/BookmarkMenuItem';
import BookmarkListToggle from './BookmarkListToggle';
import NoBookmarkMessage from '@/components/molecules/community/NoBookMarkMessage';
import { getCookie } from '@/utils/Cookie';
import { useRouter } from 'next/router';
import { BookmarkItemType } from './MainAsideCategory';
import { UrlLangType } from '@/types/common';

const MainBookmarkMenu = ({
  urlLang,
  bookmarks,
  bookmarkTitle,
}: {
  urlLang: UrlLangType;
  bookmarks: BookmarkItemType[];
  bookmarkTitle: string;
}) => {
  const router = useRouter();
  const user_id = getCookie('user_id');
  const handleBookmark = () => {
    if (!user_id) {
      router.push('/login');
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
                <BookmarkMenuItem key={item.BOARD_IDX} menuInfo={item} />
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
