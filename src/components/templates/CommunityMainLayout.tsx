import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { UrlLangType } from '@/types/common';
import Layout from '../organisms/Layout';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import styled from '@emotion/styled';
import MainAsideCategory from '../organisms/community/MainAsideCategory';
import BestNotices from '../molecules/community/BestNotices';
import CommunityBoardSearchInputWrapper from '../organisms/community/CommunityBoardSearchInputWrapper';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  children: ReactNode;
}

const CommunityMainLayout = ({ urlLang, children }: CommunityMainLayoutProps) => {
  const router = useRouter();
  const isCommunity = router.route === '/[locale]/community';
  const isPostDetail = '/[locale]/community/board/[boardIndex]/[postIndex]';
  const isMyPost = '/[locale]/community/myPost';
  const isWrite = '/[locale]/community/board/[boardIndex]/write';
  const isNoSearchInput =
    router.route === isPostDetail || router.route === isMyPost || router.route === isWrite;
  const texts = communityMainPageTexts[urlLang];
  const searchTabState = useState(texts.allCategory);

  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard urlLang={urlLang} />
            <MainAsideCategory urlLang={urlLang} />
          </div>
          <div className="mainContent">
            {!isNoSearchInput && (
              <CommunityBoardSearchInputWrapper searchTabState={searchTabState} texts={texts} />
            )}
            <div className="contentLayout">
              <div css={{ width: 810, minWidth: 810 }}>{children}</div>
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
  }
  .mainAside {
    width: 230px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .mainContent {
    .contentLayout {
      display: flex;
      gap: 20px;
    }
    padding-left: 20px;
    max-width: calc(100% - 230px);
  }
  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 50px;

    > .side-menu {
      display: none;
    }

    > .content {
      max-width: 100%;
      padding-left: 0;
    }
  }
`;
