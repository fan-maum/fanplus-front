import MenuItem from '@/components/molecules/community/MenuItem';
import { useGetMainMenuCategoryQuery } from '@/server/query';
import { ServerLangType } from '@/types/common';
import { BoardResultItemType } from '@/types/community';
import styled from '@emotion/styled';
import MenuListToggle from './MenuListToggle';

interface MainMenuListProps {
  serverLang: ServerLangType;
}

const MainMenuList = ({ serverLang }: MainMenuListProps) => {
  const { data, isFetching, isFetched } = useGetMainMenuCategoryQuery(serverLang);
  const menus = data?.RESULTS.DATAS.BOARD_LIST;
  const mainMenu = menus?.filter(
    (list: BoardResultItemType) =>
      String(list.BOARD_IDX) === '2291' || String(list.BOARD_IDX) === '139'
  );
  const subMenu = menus?.filter((list: BoardResultItemType) => !mainMenu.includes(list));

  const handleMenuListOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked board');
  };

  return (
    <MainMenuListWrapper>
      <ul>
        {mainMenu?.map((menu: BoardResultItemType) => (
          <MenuItem key={menu.BOARD_IDX} menuData={menu} onClick={handleMenuListOnClick} />
        ))}
      </ul>
      <MenuListToggle headerTitle="자유게시판">
        <ul>
          {subMenu?.map((menu: BoardResultItemType) => (
            <MenuItem key={menu.BOARD_IDX} menuData={menu} onClick={handleMenuListOnClick} />
          ))}
        </ul>
      </MenuListToggle>
    </MainMenuListWrapper>
  );
};

export default MainMenuList;

const MainMenuListWrapper = styled.div`
  li {
    width: 100%;
    height: 100%;
  }
`;
