import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  BookmarksResponseType,
  MultiBoardsInquiryItemType,
  PartialUserType,
} from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';
import BestNotices from '../molecules/community/BestNotices';
import PopularBoards from '../molecules/community/PopularBoards';
import Layout from '../organisms/Layout';
import CommunityBoardSearchInputWrapper from '../organisms/community/CommunityBoardSearchInputWrapper';
import MainAsideMenus from '../organisms/community/MainAsideMenus';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import PopularBoardsMobile from '../molecules/community/PopularBoardsMobile';
import CommunityMobileSidebar from '../modals/CommunityMobileSidebar';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  boardLangState,
  isMobileState,
  openLanguageFitlerState,
  openSideBarState,
} from '@/store/community';
import BoardMobileTitle from '../molecules/community/mobile/BoardMobileTitle';
import { useServerLang } from '@/hooks/useLanguage';
import BoardMobileDomains from '../organisms/community/mobile/BoardMobileDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import BoardMobileTabMenus from '../organisms/community/mobile/BoardMobileTabMenus';
import CommunityBoardLangSelector from '../molecules/community/CommunityBoardLangSelector';
import { getCookie } from '@/utils/Cookie';
import { useQuery } from 'react-query';
import { getMultiBoardsInquiry } from '@/api/Community';

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  boardLangCookie: BoardLangType;
  user?: PartialUserType;
  bookmarks: BookmarksResponseType;
  withSearchInput?: boolean;
  withBestNotices?: boolean;
  withBoardTab?: boolean;
  children: ReactNode;
}

const CommunityMainLayout = ({
  urlLang,
  boardLangCookie,
  user,
  bookmarks,
  withSearchInput,
  withBestNotices,
  withBoardTab,
  children,
}: CommunityMainLayoutProps) => {
  const router = useRouter();
  const serverLang = useServerLang();
  const [openSidebar, setOpenSidebar] = useRecoilState(openSideBarState);
  const isMobile = useRecoilValue(isMobileState);
  const user_id = getCookie('user_id');

  const [boardLang, setBoardLang] = useRecoilState(boardLangState(boardLangCookie));
  const setLangModal = useSetRecoilState(openLanguageFitlerState);
  const isEditMode = router.pathname.includes('write') || router.pathname.includes('edit');
  const isMyPost = router.pathname.includes('myPost');
  const isSearch = router.pathname.includes('search');
  const boardType = router.query.boardIndex as string;
  const view_type = (router.query.view as string) || 'all';

  /* boardSlug */
  const { data } = useQuery(['multiBoardsInquiry', { user_id, serverLang, boardType }], () =>
    getMultiBoardsInquiry(user_id, serverLang, boardType)
  );
  const boardSlugData = data ?? [];
  const boardSlug: MultiBoardsInquiryItemType = boardSlugData[0];
  const boardTexts = communityBoardTexts[urlLang];

  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard user={user} />
            <MainAsideMenus bookmarks={bookmarks} />
            <PopularBoards />
          </div>
          <div className="mainContent">
            {isSearch && <BoardMobileTitle boardTitle={'검색'} onClickBack={() => router.back()} />}
            <CommunityBoardSearchInputWrapper
              withSearchInput={withSearchInput}
              isEditMode={isEditMode}
              isMyPost={isMyPost}
            />
            <PopularBoardsMobile initialOpen={false} isEditMode={isEditMode} isMyPost={isMyPost} />
            <div className="contentLayout">
              <div
                css={{
                  width: 810,
                  minWidth: 810,
                  '@media(max-width:960px)': { width: '100%', minWidth: 320, flex: 1 },
                }}
              >
                <div
                  css={{
                    display: 'none',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                    '@media(max-width:768px)': { display: withBoardTab ? 'flex' : 'none' },
                  }}
                >
                  <BoardMobileTitle
                    boardTitle={boardSlug && boardSlug.BOARD_TITLE}
                    bookmarked={(boardSlug && boardSlug.menu.isBookmarked) || false}
                    menuId={Number(boardSlug && boardSlug.menu.id)}
                    onClickBack={() => router.back()}
                  />
                  <CommunityBoardLangSelector
                    onClickOpenModal={() => setLangModal(true)}
                    boardLang={boardLang}
                  />
                </div>
                <div
                  css={{
                    display: 'none',
                    alignItems: 'center',
                    height: '40px',
                    gap: 14,
                    padding: '0 16px',
                    '@media(max-width:768px)': { display: withBoardTab ? 'flex' : 'none' },
                  }}
                >
                  <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
                  <BoardMobileDomains boardDomainTexts={boardTexts.bottomTabBar} />
                </div>
                {children}
              </div>
              {withBestNotices && <BestNotices />}
            </div>
          </div>
        </div>
      </LayoutWrapper>
      <CommunityMobileSidebar
        user={user}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        bookmarks={bookmarks}
      />
    </Layout>
  );
};

export default CommunityMainLayout;

const LayoutWrapper = styled.div`
  .contents {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
    gap: 20px;
  }
  .mainAside {
    width: 230px;
    display: flex;
    flex-direction: column;
  }
  .mainAside > div:first-of-type {
    margin-bottom: 14px;
  }
  .mainContent {
    max-width: calc(100% - 250px);
    .contentLayout {
      display: flex;
      gap: 20px;
    }
    @media (max-width: 960px) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 50px;

    .mainAside {
      display: none;
    }

    .mainContent {
      width: 100%;
      max-width: 100%;

      .contentLayout {
        flex-direction: column;
      }
    }
  }
`;
