import { NotificationBoardsSkeleton } from './CommunitySkeleton';
import NotificationBoardItem from './NotificationBoardItem';

const NotificationBoard = () => {
  const data = [
    {
      rank: 1,
      postIndex: 6726975,
      postTitle: 'FanPlus Vote Female League round 15 OPEN EVENT',
      comments: 0,
    },
    {
      rank: 2,
      postIndex: 6726240,
      postTitle: '팬플러스 리그전 남자아이돌 투표 15회차 오픈',
      comments: 2,
    },
    {
      rank: 3,
      postIndex: 6721576,
      postTitle: '팬플러스 리그전 투표 남자 14회차 오픈 인용RT 이벤트',
      comments: 3,
    },
    {
      rank: 4,
      postIndex: 6698556,
      postTitle: 'FanPlus Vote Male League round 11 OPEN EVENT',
      comments: 15,
    },
    {
      rank: 5,
      postIndex: 6692588,
      postTitle: '[공지] 팬플러스 동영상 광고 미적립 투표권 4차 지급 안내',
      comments: 33,
    },
  ];

  return (
    <div
      css={{
        minWidth: 280,
        height: 260,
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        padding: '24px 30px 26px',
        zIndex: 10,
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          color: '#101010',
          font: 'normal 16px/18px Pretendard',
          fontWeight: '600',
          marginBottom: '58px',
        }}
      >
        공지
      </div>
      {/* {isFetching && <NotificationBoardsSkeleton />} */}
      <div
        css={{
          width: '100%',
          display: 'flex',
          gap: 40,
        }}
      >
        <ul css={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
          {data?.map((post, index) => {
            return (
              <NotificationBoardItem
                key={'NotificationBoardItem' + index}
                rank={index + 1}
                postIndex={Number(post.postIndex)}
                postTitle={post.postTitle}
                comments={Number(post.comments)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotificationBoard;
