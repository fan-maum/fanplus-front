import MenuItem from '@/components/molecules/community/MenuItem';
import { BookmarksItemType, sideMenuResponseType } from '@/types/community';
import { useUrlLanguage } from '@/hooks/useLanguage';
import MenuListToggle from './MenuListToggle';

interface MainMenuListProps {
  bookmarks: Array<BookmarksItemType>;
  menus: Array<sideMenuResponseType>;
  freeBoardText: string;
}

const MainMenuList = ({ bookmarks, menus, freeBoardText }: MainMenuListProps) => {
  const urlLang = useUrlLanguage();
  const [mainMenus, freeBoardSubMenus] = menus;
  const mainMenusWithoutAll = mainMenus.filter((menu) => menu !== mainMenus[3]);

  // eslint-disable-next-line no-console
  console.log(menus);

  return (
    <div>
      <ul>
        <MenuItem
          key={`mainMenu/${mainMenus[3]?.id}`}
          menuTitle={mainMenus[3]?.MenuLang[0]?.title}
          href={`/${urlLang}${mainMenus[3]?.path}`}
          menuData={mainMenus[3]}
          bookmarks={bookmarks}
          hasSubMenus={false}
        />
        {mainMenusWithoutAll.map((mainMenu) => {
          return mainMenu.photocard_board_info !== null ? (
            <MenuItem
              key={`mainMenu/${mainMenu?.id}`}
              menuTitle={mainMenu.board?.TITLE ? mainMenu.board?.TITLE : mainMenu.title}
              href={mainMenu.boardId ? `/${urlLang}/community/board/${mainMenu.boardId}` : ''}
              menuData={mainMenu}
              subMenus={freeBoardSubMenus}
              bookmarks={bookmarks}
              hasSubMenus={mainMenu.photocard_board_info === null}
            />
          ) : (
            <MenuListToggle key={'mainMenu/toggle'} headerTitle={freeBoardText}>
              <ul>
                {freeBoardSubMenus?.map((subMenu) => (
                  <MenuItem
                    key={`subMenu/${subMenu.id}`}
                    menuTitle={subMenu.board?.TITLE ? subMenu.board?.TITLE : subMenu.title}
                    href={`/${urlLang}/community/board/${subMenu.boardId}`}
                    menuData={subMenu}
                    bookmarks={bookmarks}
                    hasSubMenus={false}
                  />
                ))}
              </ul>
            </MenuListToggle>
          );
        })}
      </ul>
    </div>
  );
};

export default MainMenuList;
