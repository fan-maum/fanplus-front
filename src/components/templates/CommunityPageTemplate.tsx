import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { CommunityPropTypes } from '@/pages/[locale]/community';
import CommunityMainBoard from '../organisms/community/CommunityMainBoard';

const CommunityPageTemplate = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityMainBoardData,
  initialProps,
  boardType,
}: CommunityPropTypes & { boardType: string | string[] }) => {
  return (
    <div css={{ width: 810, height: 600 }}>
      <div css={{ display: 'flex', gap: 10, marginTop: 10 }}>
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
