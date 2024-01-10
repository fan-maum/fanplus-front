import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import { MultiBoardsInquiryItemType } from '@/types/community';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookmarksItemType } from '@/types/community';
import { getCookie } from '@/utils/Cookie';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';

type MenuItemProps = {
  menuData: MultiBoardsInquiryItemType;
  className?: string;
  disabledBookmark?: boolean;
  bookmarks: Array<BookmarksItemType>;
};

const MenuItem = ({ menuData, className, disabledBookmark, bookmarks }: MenuItemProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const { boardIndex } = router.query;
  const href = `/${urlLang}/community/board/${menuData.IDX}/`;
  const user_id = getCookie('user_id');
  const isBookmarked = Boolean(
    bookmarks.find((bookmark) => bookmark.BOARD_IDX === String(menuData.IDX))
  );

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const handleBookmarkOnClick = (boardIndex: string) => {
    if (isBookmarked) {
      useRemoveBookmark.mutate({ identity: user_id, boardIndex });
    } else {
      useAddBookmark.mutate({ identity: user_id, boardIndex });
    }
  };

  return (
    <MenuItemWrapper data-active={[Number(boardIndex)].includes(Number(menuData.IDX))}>
      <Link href={href} className="board-link">
        <span className="submenu-title">{menuData.TITLE}</span>
        {menuData.isExistNewPost && (
          <span className="new">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
        )}
      </Link>
      <BookmarkButton
        isBookmarked={isBookmarked}
        className="bookmark-icon"
        onClick={() => handleBookmarkOnClick(menuData.IDX)}
      />
    </MenuItemWrapper>
  );
};

export default MenuItem;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid ${colors.gray[200]};
  :last-child {
    border-bottom: none;
  }

  .board-link {
    position: relative;
    color: var(--color-primary-text);
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &[data-active='true'] {
    .board-link {
      .submenu-title {
        color: ${colors.primary[500]};
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .submenu-title {
    display: block;
    max-width: 150px;
    color: var(--color-light-80);
    transition: 0.1s;
    line-height: 1.17;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    letter-spacing: -0.5px;
  }

  .sub-menus {
    padding-left: 10px;
  }

  .bookmark-icon {
    transform: translateY(-0.5px);
  }
`;