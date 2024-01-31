import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityBoardAllPropTypes, CommunityBoardPropTypes } from '@/pages/[locale]/community';
import { useMediaQuery } from 'react-responsive';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import CommunityBoardLayout from './CommunityBoardLayout';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TabBar } from '../molecules/community/mobile/TabBar';
import BoardMobileTabMenus from '../organisms/community/mobile/BoardMobileTabMenus';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '@/store/community';
import { css } from '@emotion/react';

const CommunityPageTemplate = ({
  queryParams,
  communityHomeSSRdata,
  communityBestBoardSSRdata,
  initialProps,
}: CommunityBoardPropTypes & CommunityBoardAllPropTypes) => {
  const router = useRouter();
  const { urlLang } = queryParams;
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const texts = communityMainPageTexts[urlLang];
  const boardTexts = communityBoardTexts[urlLang];
  const setOpenSidebar = useSetRecoilState(openSideBarState);
  const HomeBoardType = 'community';
  const BestBoardType = 2291;

  const [tabBar, setTabBar] = useState((router.query.tab as string) || 'community');
  const searchTabState = useState(texts.boardMain);

  return (
    <div
      css={{
        width: 810,
        height: 600,
        '@media(max-width:768px)': {
          width: '100%',
          minWidth: 320,
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
        <CommunityBoardLayout
          queryParams={queryParams}
          communityBoardSSRdata={communityHomeSSRdata}
          initialProps={initialProps}
          boardType={HomeBoardType}
          boardTitle={boardTexts.bottomTabBar.all}
        />
      ) : (
        <div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 16px;
              margin-top: 20px;
            `}
          >
            <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
            <TabBar
              tabTitles={{ firstTab: texts.boardMain, secondTab: texts.bestPopular }}
              tabItems={['community', '2291']}
              tabBar={tabBar}
              texts={texts}
              setTabBar={setTabBar}
              searchTabState={searchTabState}
            />
          </div>
          {tabBar === 'community' ? (
            <CommunityBoardLayout
              queryParams={queryParams}
              communityBoardSSRdata={communityHomeSSRdata}
              initialProps={initialProps}
              boardType={HomeBoardType}
              boardTitle={boardTexts.bottomTabBar.all}
            />
          ) : (
            <CommunityBoardLayout
              queryParams={queryParams}
              communityBoardSSRdata={communityBestBoardSSRdata}
              initialProps={initialProps}
              boardType={BestBoardType}
              boardTitle={texts.bestPopular}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPageTemplate;
