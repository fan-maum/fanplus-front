import { Drawer, DrawerProps } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import MainAsideMenus from '../organisms/community/MainAsideMenus';
import PopularBoards from '../molecules/community/PopularBoards';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import styled from '@emotion/styled';
import { BookmarksResponseType, PartialUserType } from '@/types/community';

type mobileSidebarProps = {
  user: PartialUserType | undefined;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  bookmarks: BookmarksResponseType;
};

const CommunityMobileSidebar = ({
  user,
  openSidebar,
  setOpenSidebar,
  bookmarks,
  ...props
}: mobileSidebarProps) => {
  const sidebarProps: DrawerProps = {
    styles: () => ({
      inner: {
        padding: '0 !important',
        width: 262,
        height: '100%',
      },
      content: {
        transitionDuration: '500ms !important',
        flexBasis: '640px !important',
        height: '100vh !important',
        maxHeight: '100vh !important',
      },
      header: {
        padding: '14px 18px',
        svg: {
          width: '20px !important',
          height: '20px !important',
        },
      },
      body: { padding: '16px' },
    }),
    zIndex: 200000,
    opened: openSidebar,
    onClose: () => setOpenSidebar(false),
    ...props,
  };
  return (
    <Drawer {...sidebarProps} withCloseButton={false}>
      <MainAside>
        <MainAsideUserCard user={user} />
        <MainAsideMenus bookmarks={bookmarks} />
        <PopularBoards />
      </MainAside>
    </Drawer>
  );
};

export default CommunityMobileSidebar;

const MainAside = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;

  > div:first-of-type {
    margin-bottom: 14px;
  }
`;
