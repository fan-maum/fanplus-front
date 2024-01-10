import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
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

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  user?: PartialUserType;
  withSearchInput?: boolean;
  children: ReactNode;
}

const CommunityMainLayout = ({
  urlLang,
  user,
  withSearchInput,
  children,
}: CommunityMainLayoutProps) => {
  const router = useRouter();
  const isCommunity = router.route === '/[locale]/community';

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
            {withSearchInput && <CommunityBoardSearchInputWrapper />}
            <PopularBoardsMobile initialOpen={false} />
            <div className="contentLayout">
              <div
                css={{
                  width: 810,
                  minWidth: 810,
                  '@media(max-width:960px)': {
                    width: '100%',
                    minWidth: 360,
                  },
                }}
              >
                {children}
              </div>
              {!isCommunity && <BestNotices />}
            </div>
          </div>
        </div>
      </LayoutWrapper>
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
    .contentLayout {
      display: flex;
      gap: 20px;
    }
    max-width: calc(100% - 230px);
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
