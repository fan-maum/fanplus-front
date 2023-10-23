import { Skeleton } from '@mantine/core';

export const BoardItemSkeleton = () => {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid #d9d9d9',
        margin: '5px 0px',
        padding: '5px 5px 10px',
      }}
    >
      <Skeleton width={64} height={84} mx={10} radius="sm" />
      <div css={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton width={160} height={10} radius="xl" />
        <Skeleton width={120} height={10} mt={10} radius="xl" />
      </div>
    </div>
  );
};

const SingleBoardArticleSkeleton = () => {
  return (
    <li css={{ margin: '6px 12px', padding: '3px 6px', borderBottom: '1px solid #d9d9d9' }}>
      <div css={{ display: 'flex' }}>
        <Skeleton width={48} height={24} radius="lg" />
      </div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div css={{ margin: '3px 0px 6px' }}>
          <Skeleton width={160} height={24} radius="sm" />
          <div css={{ marginTop: '6px', div: { margin: '1px 0px' } }}>
            <Skeleton width={200} height={18} radius="sm" />
            <Skeleton width={100} height={18} radius="sm" />
          </div>
        </div>
      </div>
    </li>
  );
};

export const CommunityBoardArticleSkeleton = () => {
  const SkeletonList = Array.from({ length: 20 }, SingleBoardArticleSkeleton);
  return SkeletonList;
};
