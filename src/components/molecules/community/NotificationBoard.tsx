import { useGetGlobalNoticesQuery } from '@/server/useGetGlobalNoticesQuery';
import { NotificationBoardsSkeleton } from './CommunitySkeleton';
import NotificationBoardItem from './NotificationBoardItem';

const NotificationBoard = () => {
  const { data, isFetching } = useGetGlobalNoticesQuery(1); // TODO: 26으로 바뀔 예정

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
      {isFetching ? (
        <NotificationBoardsSkeleton />
      ) : (
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
                  postIndex={Number(post.IDX)}
                  postTitle={post.TITLE}
                  comments={Number(post.COMMENT_CNT)}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBoard;
