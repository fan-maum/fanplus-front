import styled from '@emotion/styled';
import BoardMobileTabMenus from './BoardMobileTabMenus';
import { useGetMultiBoardsInquiryQuery } from '@/server/query';
import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/router';
import { MultiBoardsInquiryItemType, MultiBoardsInquiryResponseType } from '@/types/community';
import BoardMobileTitle from '@/components/molecules/community/mobile/BoardMobileTitle';
import BoardDomains from '../BoardDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { Dispatch, SetStateAction } from 'react';

type BoardMobileTabProps = {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};
const BoardMobileTab = ({ setOpenSidebar }: BoardMobileTabProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const serverLang = useServerLang();
  const { boardIndex = 'community' } = router?.query;
  const mainMenuBoardList = [Number(boardIndex)];
  const boardList = [Number(boardIndex), ...mainMenuBoardList];
  const viewType = (router.query.view as string) || 'all';
  const texts = communityBoardTexts[urlLang];

  const { data } = useGetMultiBoardsInquiryQuery(serverLang, boardList);
  const boardBySlugs: MultiBoardsInquiryResponseType = data ?? [];
  const boardInfo: MultiBoardsInquiryItemType = boardBySlugs[0];

  return (
    <BoardMobileTabWrapper>
      <BoardMobileTitle boardInfo={boardInfo} />
      <div className="boardMobileTabAllMenu-wrapper">
        <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
        <BoardDomains viewType={viewType} boardDomainTexts={texts.bottomTabBar} />
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
        display: block;
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
