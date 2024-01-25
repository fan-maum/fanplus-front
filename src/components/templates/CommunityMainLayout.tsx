import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, type ReactNode } from 'react';
import BestNotices from '../molecules/community/BestNotices';
import PopularBoards from '../molecules/community/PopularBoards';
import Layout from '../organisms/Layout';
import CommunityBoardSearchInputWrapper from '../organisms/community/CommunityBoardSearchInputWrapper';
import MainAsideMenus from '../organisms/community/MainAsideMenus';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import PopularBoardsMobile from '../molecules/community/PopularBoardsMobile';
import BoardMobileTab from '../organisms/community/mobile/BoardMobileTab';
import CommunityMobileSidebar from '../modals/CommunityMobileSidebar';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import { TabPropTypes } from './CommunityPageTemplate';

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  user?: PartialUserType;
  withSearchInput?: boolean;
  withBestNotices?: boolean;
  children: ReactNode;
}

const CommunityMainLayout = ({
  urlLang,
  user,
  withSearchInput,
  withBestNotices,
  tabBarState: [tabBar, setTabBar],
  searchTabState,
  children,
}: CommunityMainLayoutProps & TabPropTypes) => {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const isEditMode = router.pathname.includes('write') || router.pathname.includes('edit');
  const texts = communityMainPageTexts[urlLang];

  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard user={user} />
            <MainAsideMenus />
            <PopularBoards />
          </div>
          <div className="mainContent">
            <CommunityBoardSearchInputWrapper
              withSearchInput={withSearchInput}
              isEditMode={isEditMode}
            />
            <PopularBoardsMobile initialOpen={false} isEditMode={isEditMode} />
            <div className="contentLayout">
              <div
                css={{
                  width: 810,
                  minWidth: 810,
                  '@media(max-width:960px)': { width: '100%', minWidth: 320, flex: 1 },
                }}
              >
                <BoardMobileTab
                  setOpenSidebar={setOpenSidebar}
                  tabBar={tabBar}
                  texts={texts}
                  setTabBar={setTabBar}
                  searchTabState={searchTabState}
                />
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
