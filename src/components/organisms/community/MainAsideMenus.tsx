import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import MainBookmarkMenu from './MainBookmarkMenu';
import MainMenuList from './MainMenuList';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import { useQuery } from 'react-query';
import { getSideMenu } from '@/api/Community';
import { getCookie } from '@/utils/Cookie';
import { BookmarksResponseType } from '@/types/community';
import { SideMenuListSkeleton } from '@/components/molecules/community/CommunitySkeleton';

const MainAsideMenus = ({ bookmarks }: { bookmarks: BookmarksResponseType }) => {
  const urlLang = useUrlLanguage();
  const serverLang = useServerLang();
  const texts = communityLayoutTexts[urlLang];
  const user_id = getCookie('user_id');

  const { data: sideMenuData, isFetching } = useQuery(['sideMenu', { serverLang }], async () => {
    let response = await getSideMenu(serverLang, user_id);
    const responseData = [response[0], response[2], response[4], response[3], response[1]];
    return responseData;
  });

  const sideMenus = sideMenuData ?? [];

  return (
    <MenuWrapper>
      <div className="title">{texts.fanplusCommunity}</div>
      <MainBookmarkMenu urlLang={urlLang} bookmarks={bookmarks} bookmarkTitle={texts.bookmark} />
      {isFetching ? (
        <SideMenuListSkeleton />
      ) : (
        <MainMenuList menus={sideMenus} freeBoardText={texts.asideMenus[1]} />
      )}
    </MenuWrapper>
  );
};

export default MainAsideMenus;

const MenuWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: ${colors.gray[20]};
    text-align: center;
    color: ${colors.gray[1000]};
    font-size: 16px;
    font-weight: 600;
  }
  .menu-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    white-space: nowrap;
    cursor: pointer;
    line-height: 15px;
    margin: 0;

    color: ${colors.gray[1000]};

    .title-top-menu {
      font-weight: 500;
      font-size: 14px;
    }

    &[data-active='true'] {
      color: ${colors.primary[500]};
    }
  }

  .new {
    margin-left: 4px !important;
    margin-top: 4px !important;
    right: -4px;
    transform: translateY(-1px);
    display: inline-block;
  }
`;
