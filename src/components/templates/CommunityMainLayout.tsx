import { UrlLangType } from '@/types/common';
import Layout from '../organisms/Layout';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import MainAsideCategory from '../organisms/community/MainAsideCategory';
import BestNotices from '../molecules/community/BestNotices';

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  children: ReactNode;
}

const CommunityMainLayout = ({ urlLang, children }: CommunityMainLayoutProps) => {
  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard urlLang={urlLang} />
            <MainAsideCategory urlLang={urlLang} />
          </div>
          <div className="mainContent">{children}</div>
          {/* <BestNotices /> */}
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
    /* width: 100%; */
    padding-left: 40px;
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
