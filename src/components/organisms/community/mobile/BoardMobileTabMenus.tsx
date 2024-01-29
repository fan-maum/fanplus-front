import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';

const BoardMobileTabMenus = ({
  setOpenSidebar,
}: {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <BoardMobileTabMenusButton onClick={() => setOpenSidebar(true)}>
      <img src="/icons/icon_Menu.svg" alt="메뉴버튼" />
    </BoardMobileTabMenusButton>
  );
};

export default BoardMobileTabMenus;

const BoardMobileTabMenusButton = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }

  > span {
    color: #c3c0c0;
    font-size: 14px;
  }

  > img {
    width: 100%;
  }
`;
