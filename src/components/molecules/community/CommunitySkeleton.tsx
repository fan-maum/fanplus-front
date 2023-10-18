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
