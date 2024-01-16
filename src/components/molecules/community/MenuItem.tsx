import BookmarkButton from '@/components/atoms/BookmarkButton';
import { colors } from '@/styles/CommunityColors';
import { sideMenuItemType } from '@/types/community';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookmarksItemType } from '@/types/community';
import { getCookie } from '@/utils/Cookie';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';

type MenuItemProps = {
  menuTitle: string | undefined;
  href: string;
  menuData: sideMenuItemType;
  className?: string;
};

const MenuItem = ({ menuTitle, href, menuData, className }: MenuItemProps) => {
  const router = useRouter();
  const { boardIndex } = router.query;
  const user_id = getCookie('user_id');
  const isBookmarked = menuData.isBookmarked;

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const handleBookmarkOnClick = (menuId: number) => {
    if (isBookmarked) {
      useRemoveBookmark.mutate({ identity: user_id, menuId });
    } else {
      useAddBookmark.mutate({ identity: user_id, menuId });
    }
  };

  return (
    <MenuItemWrapper data-active={[Number(boardIndex)].includes(Number(menuData.id))}>
      <Link href={href} className="board-link">
        <span className="submenu-title">{menuTitle}</span>
        {menuData.isExistNewPost && (
          <span className="new">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
        )}
      </Link>
      <BookmarkButton
        isBookmarked={isBookmarked}
        className="bookmark-icon"
        onClick={() => handleBookmarkOnClick(Number(menuData.id))}
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
