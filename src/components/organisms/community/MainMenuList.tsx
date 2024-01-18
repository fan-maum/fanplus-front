import MenuItem from '@/components/molecules/community/MenuItem';
import { sideMenuResponseType } from '@/types/community';
import { useUrlLanguage } from '@/hooks/useLanguage';
import MenuListToggle from './MenuListToggle';

interface MainMenuListProps {
  menus: sideMenuResponseType;
  freeBoardText: string;
}

const MainMenuList = ({ menus, freeBoardText }: MainMenuListProps) => {
  const urlLang = useUrlLanguage();

  return (
    <div>
      <ul>
        {menus.map((menu) => {
          const menuUrl =
            menu.slug === 'all'
              ? `/${urlLang}/community`
              : `/${urlLang}/community/board/${menu.boardId}`;

          return !menu.children ? (
            <MenuItem
              key={`mainMenu/${menu.id}`}
              menuTitle={menu.title}
              href={menuUrl}
              menuData={menu}
            />
          ) : (
            <MenuListToggle key={'mainMenu/toggle'} headerTitle={freeBoardText}>
              <ul>
                {menu.children.map((subMenu) => (
                  <MenuItem
                    key={`subMenu/${subMenu.id}`}
                    menuTitle={subMenu.title}
                    href={`/${urlLang}/community/board/${subMenu.boardId}`}
                    menuData={subMenu}
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
