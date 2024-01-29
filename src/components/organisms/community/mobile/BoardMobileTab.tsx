import styled from '@emotion/styled';
import BoardMobileTabMenus from './BoardMobileTabMenus';
import { useRouter } from 'next/router';
import BoardMobileTitle from '@/components/molecules/community/mobile/BoardMobileTitle';
import BoardDomains from '../BoardDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { Dispatch, SetStateAction } from 'react';
import { useUrlLanguage } from '@/hooks/useLanguage';

type BoardMobileTabProps = {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

const BoardMobileTab = ({ setOpenSidebar }: BoardMobileTabProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const isBoardPage = router.route === '/[locale]/community/board/[boardIndex]';
  const viewType = (router.query.view as string) || 'all';
  const boardTexts = communityBoardTexts[urlLang];
  return (
    <BoardMobileTabWrapper>
      <BoardMobileTitle />
      <div className="boardMobileTabAllMenu-wrapper">
        {/* <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} /> */}
        {/* <TabBar
          tabTitles={{ firstTab: texts.boardMain, secondTab: texts.bestPopular }}
          tabItems={['community', '2291']}
          tabBar={tabBar}
          texts={texts}
          setTabBar={setTabBar}
          searchTabState={searchTabState}
        /> */}
        {/* <BoardDomains viewType={viewType} boardDomainTexts={boardTexts.bottomTabBar} /> */}
      </div>
    </BoardMobileTabWrapper>
  );
};

export default BoardMobileTab;

const BoardMobileTabWrapper: any = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 16px;

    .boardMobileTabAllMenu-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      display: none;
      @media (max-width: 768px) {
        display: flex;
        align-items: end;
      }
    }
  }

  .menu-wrapper[data-active='true'] {
    border-bottom: '2px solid var(--color-primary)';
  }

  .menu-wrapper {
    font-size: 14px;
    color: #918f8f;
    font-weight: 500;
    padding: 10px 0;
    cursor: pointer;

    span[data-active='true'] {
      color: 'var(--color-primary)';
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
