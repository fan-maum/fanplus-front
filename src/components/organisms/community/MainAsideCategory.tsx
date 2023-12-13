import PopularBoards from '@/components/molecules/community/PopularBoards';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import { UrlLangType } from '@/types/common';
import styled from '@emotion/styled';
import MainAsideMenus from './MainAsideMenus';

interface MainAsideMenuProps {
  urlLang: UrlLangType;
}

const MainAsideCategory = ({ urlLang }: MainAsideMenuProps) => {
  const texts = communityLayoutTexts[urlLang];
  return (
    <MainAsideMenuWrapper>
      <MainAsideMenus />
      <PopularBoards title={texts.popularBoards + ' TOP 50'} />
    </MainAsideMenuWrapper>
  );
};

export default MainAsideCategory;

const MainAsideMenuWrapper = styled.div``;
