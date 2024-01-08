import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { BookmarksItemType } from '@/types/community';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BookmarkMenuItemProps {
  menuInfo: {
    BOARD_IDX: string;
    BOARD_TITLE: string;
  };
  user_id: string;
  bookmarks: Array<BookmarksItemType>;
}

const BookmarkMenuItem = ({ menuInfo, user_id, bookmarks }: BookmarkMenuItemProps) => {
  const router = useRouter();
  const { BOARD_IDX, BOARD_TITLE } = menuInfo;
  const isActive = BOARD_IDX === router.query.boardIndex;
  const href = `/community/board/${BOARD_IDX}`;

  const { useRemoveBookmark } = useBookmarkOnClick();

  const addBookmarkOnClick = async (boardIndex: string) => {
    useRemoveBookmark.mutate({ identity: user_id, boardIndex });
  };

  return (
    <BookmarkMenuItemWrapper>
      <Link className="bookmark-link" href={href} data-status={isActive}>
        <span>{BOARD_TITLE}</span>
        {/* {hasNewPost && ( */}
        <span className="new-post-icon">
          <img src="/icons/icon_new.svg" alt="new-icon" />
        </span>
        {/* )} */}
      </Link>
      <BookmarkButton
        isBookmarked={true}
        height="18px"
        onClick={() => addBookmarkOnClick(menuInfo.BOARD_IDX)}
      />
    </BookmarkMenuItemWrapper>
  );
};

export default BookmarkMenuItem;

const BookmarkMenuItemWrapper: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 12px 0 16px;

  .new-post-icon {
    padding-left: 5px;
  }

  .bookmark-link {
    color: var(--color-light-80);

    &[data-status='true'] {
      color: var(--color-primary);
    }
  }
`;
