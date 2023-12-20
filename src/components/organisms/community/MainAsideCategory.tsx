import PopularBoards from '@/components/molecules/community/PopularBoards';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import { UrlLangType } from '@/types/common';
import styled from '@emotion/styled';
import MainAsideMenus from './MainAsideMenus';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';

interface MainAsideMenuProps {
  urlLang: UrlLangType;
  mode: string | undefined;
  onClickCancel: () => void;
}

const MainAsideCategory = ({ urlLang, mode, onClickCancel }: MainAsideMenuProps) => {
  const texts = communityLayoutTexts[urlLang];
  return (
    <MainAsideMenuWrapper>
      <MainAsideMenus urlLang={urlLang} mode={mode} onClickCancel={onClickCancel} />
      <PopularBoards
        title={texts.popularBoards + ' TOP 50'}
        mode={mode}
        onClickCancel={onClickCancel}
      />
    </MainAsideMenuWrapper>
  );
};

export default MainAsideCategory;

const MainAsideMenuWrapper = styled.div``;
