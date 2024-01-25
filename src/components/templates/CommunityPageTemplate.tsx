import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityBoardAllPropTypes, CommunityBoardPropTypes } from '@/pages/[locale]/community';
import { useMediaQuery } from 'react-responsive';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import CommunityBoardLayout from './CommunityBoardLayout';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

export type TabPropTypes = {
  tabBarState: [string, React.Dispatch<React.SetStateAction<any>>];
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

const CommunityPageTemplate = ({
  queryParams,
  communityHomeSSRdata,
  communityBestBoardSSRdata,
  initialProps,
  tabBarState: [tabBar, setTabBar],
}: CommunityBoardPropTypes & CommunityBoardAllPropTypes & TabPropTypes) => {
  const { urlLang } = queryParams;
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const texts = communityMainPageTexts[urlLang];
  const boardTexts = communityBoardTexts[urlLang];
  const HomeBoardType = 'community';
  const BestBoardType = 2291;

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
