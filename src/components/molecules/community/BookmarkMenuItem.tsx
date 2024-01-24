import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { colors } from '@/styles/CommunityColors';
import { BookmarksItemType } from '@/types/community';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BookmarkMenuItemProps {
  bookmark: BookmarksItemType;
  user_id: string;
}

const BookmarkMenuItem = ({ bookmark, user_id }: BookmarkMenuItemProps) => {
  const router = useRouter();
  const isActive = bookmark.boardId === router.query.boardIndex;
  const href = `/community/board/${bookmark.boardId}`;

  const { useRemoveBookmark } = useBookmarkOnClick();

  const addBookmarkOnClick = async (menuId: number) => {
    useRemoveBookmark.mutate({ identity: user_id, menuId });
  };

  return (
    <BookmarkMenuItemWrapper>
      <Link className="bookmark-link" href={href} data-status={isActive}>
        <span>{bookmark.title}</span>
        {bookmark.isExistNewPost && (
          <span className="new-post-icon">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
        )}
      </Link>
      <BookmarkButton
        isBookmarked={true}
        height="18px"
        onClick={() => addBookmarkOnClick(Number(bookmark.id))}
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
    color: ${colors.gray[1000]};
    font-size: 14px;
    font-weight: 400;
    padding-left: 8px;

    &[data-status='true'] {
      color: ${colors.primary[500]};
    }
  }
`;
