import MenuItem from '@/components/molecules/community/MenuItem';
import { useServerLang } from '@/hooks/useLanguage';
import { useGetMultiBoardsInquiryQuery } from '@/server/query';
import styled from '@emotion/styled';
import MenuListToggle from './MenuListToggle';

// * 2291: BEST 인기글(실시간) / 139: 공지사항 / 161: 건의사항 / 160: 자유게시판 / 115: 팬플 지식in / 192: 팬플러스 광고 사진 / 114: 팬픽 / 220: 팬픽 공지사항
const mainMenuBoardList = [2291, 139];
const subMenuBoardList = [161, 160, 115, 192, 114, 220];
const inquiryBoardList = [...mainMenuBoardList, ...subMenuBoardList];

const MainMenuList = () => {
  const serverLang = useServerLang();
  const { data, isFetching } = useGetMultiBoardsInquiryQuery(serverLang, inquiryBoardList);

  const mainMenu = data?.filter((menu) => mainMenuBoardList.includes(Number(menu.IDX)));
  const subMenu = data?.filter((menu) => !mainMenuBoardList.includes(Number(menu.IDX)));

  return (
    <MainMenuListWrapper>
      <ul>
        {mainMenu?.map((menu) => (
          <MenuItem key={menu.IDX} menuData={menu} />
        ))}
      </ul>
      <MenuListToggle headerTitle="자유게시판">
        <ul>
          {subMenu?.map((menu) => (
            <MenuItem key={menu.IDX} menuData={menu} />
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
