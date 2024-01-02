import MenuItem from '@/components/molecules/community/MenuItem';
import { useGetMainMenuCategoryQuery } from '@/server/query';
import { ServerLangType } from '@/types/common';
import { BoardResultItemType } from '@/types/community';
import styled from '@emotion/styled';
import MenuListToggle from './MenuListToggle';
import { BookmarkItemType } from './MainAsideCategory';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';

interface MainMenuListProps {
  serverLang: ServerLangType;
  bookmarks: BookmarkItemType[];
  freeBoardText: string;
}

const MainMenuList = ({ serverLang, bookmarks, freeBoardText }: MainMenuListProps) => {
  const { data, isFetching, isFetched } = useGetMainMenuCategoryQuery(serverLang);
  const menus = data?.RESULTS.DATAS.BOARD_LIST;
  const mainMenu = menus?.filter(
    (list: BoardResultItemType) =>
      String(list.BOARD_IDX) === '2291' || String(list.BOARD_IDX) === '139'
  );
  const subMenu = menus?.filter((list: BoardResultItemType) => !mainMenu.includes(list));

  return (
    <MainMenuListWrapper>
      <ul>
        {mainMenu?.map((menu: BoardResultItemType) => (
          <MenuItem key={menu.BOARD_IDX} menuData={menu} bookmarks={bookmarks} />
        ))}
      </ul>
      <MenuListToggle headerTitle={freeBoardText}>
        <ul>
          {subMenu?.map((menu: BoardResultItemType) => (
            <MenuItem key={menu.BOARD_IDX} menuData={menu} bookmarks={bookmarks} />
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
