import styled from '@emotion/styled';
import BoardMobileTabMenus from './BoardMobileTabMenus';
import { useGetMultiBoardsInquiryQuery } from '@/server/query';
import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/router';
import { MultiBoardsInquiryItemType, MultiBoardsInquiryResponseType } from '@/types/community';
import BoardMobileTitle from '@/components/molecules/community/mobile/BoardMobileTitle';
import BoardDomains from '../BoardDomains';
import { TabBar } from '@/components/molecules/community/mobile/TabBar';
import { CommunityPageTextType } from '@/types/textTypes';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { Dispatch, SetStateAction } from 'react';

type BoardMobileTabProps = {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  tabBar: string;
  texts: CommunityPageTextType;
  setTabBar: Dispatch<SetStateAction<string>>;
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

const BoardMobileTab = ({
  setOpenSidebar,
  tabBar,
  texts,
  setTabBar,
  searchTabState,
}: BoardMobileTabProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const serverLang = useServerLang();
  const { boardIndex = 'community' } = router?.query;
  const mainMenuBoardList = [Number(boardIndex)];
  const boardList = [Number(boardIndex), ...mainMenuBoardList];
  const viewType = (router.query.view as string) || 'all';
  const boardTexts = communityBoardTexts[urlLang];

  const { data } = useGetMultiBoardsInquiryQuery(serverLang, boardList);
  const boardBySlugs: MultiBoardsInquiryResponseType = data ?? [];
  const boardInfo: MultiBoardsInquiryItemType = boardBySlugs[0];

  return (
    <BoardMobileTabWrapper>
      <BoardMobileTitle boardInfo={boardInfo} />
      <div className="boardMobileTabAllMenu-wrapper">
        <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
        <TabBar
          tabTitles={{ firstTab: texts.boardMain, secondTab: texts.bestPopular }}
          tabItems={['community', '2291']}
          tabBar={tabBar}
          texts={texts}
          setTabBar={setTabBar}
          searchTabState={searchTabState}
        />
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
