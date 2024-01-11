import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityBestBoardPropTypes, CommunityPropTypes } from '@/pages/[locale]/community';
import CommunityMainBoard from '../organisms/community/CommunityMainBoard';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { TabBar } from '../molecules/community/TabBar';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import { useState } from 'react';
import CommunityBoardWrapper from '../organisms/community/CommunityBoardWrapper';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

const CommunityPageTemplate = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityMainBoardData,
  initialProps,
  communityBoardData,
  initialBestBoardProps,
}: CommunityPropTypes & CommunityBestBoardPropTypes) => {
  const router = useRouter();
  const { boardType = 'community' } = router.query;
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const texts = communityMainPageTexts[urlLang];

  const [tabBar, setTabBar] = useState((router.query.tab as string) || 'community');
  const searchTabState = useState(texts.boardMain);
  const [activeTabState] = searchTabState;

  return (
    <div
      css={{
        width: 810,
        height: 600,
        '@media(max-width:768px)': {
          width: '100%',
          minWidth: 360,
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          gap: 10,
          marginTop: 10,
          '@media(max-width:768px)': {
            display: 'none',
          },
        }}
      >
        <HorizontalBestNotices />
        <NotificationBoard />
      </div>
      {!isMobile ? (
        <CommunityMainBoard
          urlLang={urlLang}
          userId={userId}
          isAdminAccount={isAdminAccount}
          boardLangCookie={boardLangCookie}
          communityMainBoardData={communityMainBoardData}
          boardType={boardType}
          initialProps={initialProps}
        />
      ) : (
        <div>
          <TabBar
            tabTitles={{ firstTab: texts.boardMain, secondTab: texts.bestPopular }}
            tabItems={['community', 'bestPopular']}
            tabBar={tabBar}
            texts={texts}
            setTabBar={setTabBar}
            searchTabState={searchTabState}
          />
          {tabBar === 'community' ? (
            <CommunityMainBoard
              urlLang={urlLang}
              userId={userId}
              isAdminAccount={isAdminAccount}
              boardLangCookie={boardLangCookie}
              communityMainBoardData={communityMainBoardData}
              boardType={boardType}
              initialProps={initialProps}
            />
          ) : (
            <CommunityBoardWrapper
              urlLang={urlLang}
              userId={userId}
              boardTitle={texts.bestPopular}
              boardType={'mainBestPopular'}
              isAdminAccount={isAdminAccount}
              boardLangCookie={boardLangCookie}
              communityBoardData={communityBoardData}
              initialProps={initialBestBoardProps}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPageTemplate;
