import PopularBoards from '@/components/molecules/community/PopularBoards';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import { UrlLangType } from '@/types/common';
import styled from '@emotion/styled';
import MainAsideMenus from './MainAsideMenus';

export interface BookmarkItemType {
  BOARD_IDX: string;
  BOARD_TITLE: string;
}
interface MainAsideMenuProps {
  urlLang: UrlLangType;
  bookmarks: BookmarkItemType[];
}

const MainAsideCategory = ({ urlLang, bookmarks }: MainAsideMenuProps) => {
  const texts = communityLayoutTexts[urlLang];
  return (
    <MainAsideMenuWrapper>
      <MainAsideMenus urlLang={urlLang} bookmarks={bookmarks} />
      <PopularBoards title={texts.popularBoards + ' TOP 50'} />
    </MainAsideMenuWrapper>
  );
};

export default MainAsideCategory;

const MainAsideMenuWrapper = styled.div``;
