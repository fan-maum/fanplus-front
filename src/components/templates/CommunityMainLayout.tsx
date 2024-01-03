import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';
import BestNotices from '../molecules/community/BestNotices';
import Layout from '../organisms/Layout';
import CommunityBoardSearchInputWrapper from '../organisms/community/CommunityBoardSearchInputWrapper';
import MainAsideCategory from '../organisms/community/MainAsideCategory';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import { BookmarksResponseType } from '@/types/community';
import { useGetBookmarksQuery } from '@/server/query';
import { useQuery } from 'react-query';
import { getBookmarks } from '@/api/Community';

interface CommunityMainLayoutProps {
  user_id: string;
  urlLang: UrlLangType;
  user?: PartialUserType;
  bookmarksData: BookmarksResponseType;
  withSearchInput?: boolean;
  children: ReactNode;
}

const CommunityMainLayout = ({
  user_id,
  urlLang,
  bookmarksData,
  user,
  withSearchInput,
  children,
}: CommunityMainLayoutProps) => {
  const router = useRouter();
  const isCommunity = router.route === '/[locale]/community';
  const bookmarks = bookmarksData.SUBSCRIPTION_BOARDS;
  const locale = router.query.locale;

  const { data, isFetched } = useQuery(
    ['bookmarks', { user_id, urlLang }],
    () => getBookmarks(user_id, urlLang),
    { initialData: urlLang === locale ? bookmarksData : undefined }
  );
  console.log(bookmarksData);
  console.log(data);

  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard user={user} urlLang={urlLang} />
            <MainAsideCategory urlLang={urlLang} bookmarks={bookmarks} />
          </div>
          <div className="mainContent">
            {withSearchInput && <CommunityBoardSearchInputWrapper />}
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
