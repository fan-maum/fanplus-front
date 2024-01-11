import { useState } from 'react';
import styled from '@emotion/styled';
import MainAsideMenus from '../MainAsideMenus';
import PopularBoards from '@/components/molecules/community/PopularBoards';
import MobileSideBar from './mobileSideBar';
import { Portal } from '@mantine/core';

const BoardMobileTabMenus = () => {
  const [visible, setVisible] = useState(false);
  const handleOpOpen = () => setVisible(true);
  const handleOnClose = () => setVisible(false);

  return (
    <>
      <BoardMobileTabMenusWrapper onClick={handleOpOpen}>
        <img src="/icons/icon_Menu.svg" alt="메뉴버튼" />
      </BoardMobileTabMenusWrapper>

      <Portal>
        <MobileSideBar visible={visible} onClose={handleOnClose}>
          <StyledMenuWrapper className="menu-wrapper">
            <div className="nav-page-info">
              <MainAsideMenus />
            </div>
            <PopularBoards />
          </StyledMenuWrapper>
        </MobileSideBar>
      </Portal>
    </>
  );
};

export default BoardMobileTabMenus;

const BoardMobileTabMenusWrapper = styled.div`
  background-color: var(--color-background);
  padding: 8px 11px;
  display: flex;
  width: 47px;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: none;
  }

  > span {
    color: #c3c0c0;
    font-size: 14px;
  }

  > img {
    width: 24px;
  }
`;

const StyledMenuWrapper = styled.div`
  width: 250px;
  .nav-page-info {
    padding: 10px;
  }
`;
