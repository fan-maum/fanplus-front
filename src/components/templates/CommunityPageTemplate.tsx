import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import { BookmarksResponseType } from '@/types/community';

const CommunityPageTemplate = ({ bookmarksData }: { bookmarksData: BookmarksResponseType }) => {
  return (
    <div css={{ width: 810, height: 600 }}>
      <div css={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <HorizontalBestNotices />
        <NotificationBoard />
      </div>
      <div>전체글</div>
    </div>
  );
};

export default CommunityPageTemplate;
