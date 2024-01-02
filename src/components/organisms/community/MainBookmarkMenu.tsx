import BookmarkMenuItem from '@/components/molecules/community/BookmarkMenuItem';
import BookmarkListToggle from './BookmarkListToggle';
import NoBookmarkMessage from '@/components/molecules/community/NoBookMarkMessage';
import { getBookmarks, getUser } from '@/api/Community';
import { getCookie } from '@/utils/Cookie';
import { useRouter } from 'next/router';
import { BookmarkItemType } from './MainAsideCategory';

const MainBookmarkMenu = ({
  urlLang,
  bookmarks,
}: {
  urlLang: string;
  bookmarks: BookmarkItemType[];
  // urlLang: UrlLangType => 나중에 소진님 API 수정 후 고쳐야댐
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
      <BookmarkListToggle headerTitle="즐겨찾기" isActive={Boolean(bookmarks?.length)}>
        <div>
          {hasBookmarkMenu ? (
            <div className="bookmark-list" style={{ fontSize: '13px' }}>
              {bookmarks.map((item) => (
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
