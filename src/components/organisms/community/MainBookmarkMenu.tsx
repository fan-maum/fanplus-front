import BookmarkMenuItem from '@/components/molecules/community/BookmarkMenuItem';
import BookmarkListToggle from './BookmarkListToggle';
import NoBookmarkMessage from '@/components/molecules/community/NoBookMarkMessage';

const MainBookmarkMenu = () => {
  const data = {
    bookmarks: [
      {
        id: 1,
        title: 'BEST 인기글(실시간)',
        slug: '2291',
        hasNewPost: true,
      },
    ],
  };
  const handleBookmark = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');

    // if (!user.data.id) {
    //   router.push('/login');
    // }
  };
  const hasBookmarkMenu = false;
  return (
    <div onClick={handleBookmark}>
      <BookmarkListToggle headerTitle="즐겨찾기" isActive={Boolean(data?.bookmarks.length)}>
        <div>
          {hasBookmarkMenu ? (
            <div
              className="bookmark-list"
              style={{
                padding: '0 0 10px',
                fontSize: '13px',
              }}
            >
              {data?.bookmarks.map((item) => (
                <BookmarkMenuItem key={item.id} menuInfo={item} />
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
