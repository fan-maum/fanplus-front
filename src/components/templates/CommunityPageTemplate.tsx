import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityPropTypes } from '@/pages/[locale]/community';
import CommunityMainBoard from '../organisms/community/CommunityMainBoard';
import { useRouter } from 'next/router';

const CommunityPageTemplate = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityMainBoardData,
  initialProps,
}: CommunityPropTypes) => {
  const router = useRouter();
  const { boardType = 'community' } = router.query;

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
      <CommunityMainBoard
        urlLang={urlLang}
        userId={userId}
        isAdminAccount={isAdminAccount}
        boardLangCookie={boardLangCookie}
        communityMainBoardData={communityMainBoardData}
        boardType={boardType}
        initialProps={initialProps}
      />
    </div>
  );
};

export default CommunityPageTemplate;
