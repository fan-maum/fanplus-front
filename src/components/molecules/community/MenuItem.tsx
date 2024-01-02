import Link from 'next/link';
import { useRouter } from 'next/router';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import styled from '@emotion/styled';
import { BoardResultItemType } from '@/types/community';
import { colors } from '@/styles/CommunityColors';
import { BookmarkItemType } from '@/components/organisms/community/MainAsideCategory';

type MenuItemProps = {
  menuData: BoardResultItemType;
  className?: string;
  disabledBookmark?: boolean;
  bookmarks: BookmarkItemType[];
};

const MenuItem = ({ menuData, className, disabledBookmark, bookmarks }: MenuItemProps) => {
  const router = useRouter();
  const { boardIndex } = router.query;
  const href = `/community/board/${menuData.BOARD_IDX}/`;
  const isBookmarked = Boolean(
    bookmarks.find((bookmark) => bookmark.BOARD_IDX === menuData.BOARD_IDX)
  );

  return (
    <MenuItemWrapper data-active={[Number(boardIndex)].includes(Number(menuData.BOARD_IDX))}>
      <Link href={href} className="board-link">
        <span className="submenu-title">{menuData.BOARD_TITLE}</span>
        {/* {menuData.hasNewPost && ( */}
        <span className="new">
          <img src="/icons/icon_new.svg" alt="new-icon" />
        </span>
        {/* )} */}
      </Link>
      <BookmarkButton isBookmarked={isBookmarked} className="bookmark-icon" />
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
