import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';

const CommunityPageTemplate = () => {
  return (
    <div css={{ width: 810, height: 600 }}>
      <div css={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <HorizontalBestNotices />
        <NotificationBoard />
      </div>
      <>전체글</>
    </div>
  );
};

export default CommunityPageTemplate;
