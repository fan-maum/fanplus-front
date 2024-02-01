import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityBoardAllPropTypes, CommunityBoardPropTypes } from '@/pages/[locale]/community';
import CommunityBoardLayout from './CommunityBoardLayout';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

const CommunityPageTemplate = ({
  queryParams,
  communityHomeSSRdata,
  initialProps,
}: CommunityBoardPropTypes & CommunityBoardAllPropTypes) => {
  const { urlLang } = queryParams;
  const boardTexts = communityBoardTexts[urlLang];
  const HomeBoardType = 'community';

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
      <CommunityBoardLayout
        queryParams={queryParams}
        communityBoardSSRdata={communityHomeSSRdata}
        initialProps={initialProps}
        boardType={HomeBoardType}
        boardTitle={boardTexts.bottomTabBar.all}
      />
    </div>
  );
};

export default CommunityPageTemplate;
