import { Skeleton } from '@mantine/core';
import CommunityBoardArticleTableHeader from './CommunityBoardArticleTableHeader';

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

export const BoardItemListSkeleton = () => {
  return Array.from({ length: 20 }, (_, idx) => (
    <BoardItemSkeleton key={'Board Item Skeleton' + idx} />
  ));
};

const CommunityBoardArticleSkeleton = () => {
  return (
    <li
      css={{
        '@media (max-width: 768px)': { display: 'none' },
        borderBottom: '1px solid #d9d9d9',
        display: 'flex',
        alignItems: 'center',
        height: 44,
      }}
    >
      <div css={{ width: 106, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton width={50} height={16} radius="sm" />
      </div>
      <div css={{ width: 310, display: 'flex', alignItems: 'center' }}>
        <Skeleton width={200} height={16} radius="sm" />
      </div>
      <div css={{ width: 78, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton width={64} height={16} radius="sm" />
      </div>
      <div css={{ width: 82, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton width={64} height={16} radius="sm" />
      </div>
      <div css={{ width: 78, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton width={30} height={16} radius="sm" />
      </div>
      <div css={{ width: 74, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton width={30} height={16} radius="sm" />
      </div>
    </li>
  );
};

const CommunityBoardArticleMobileSkeleton = () => {
  return (
    <li
      css={{
        '@media (min-width: 768px)': { display: 'none' },
        borderBottom: '1px solid #d9d9d9',
        display: 'block',
        padding: '5px 5px 0',
      }}
    >
      <div css={{ display: 'flex' }}>
        <Skeleton width={48} height={21} radius="lg" />
      </div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div css={{ margin: '3px 0px 6px' }}>
          <Skeleton width={160} height={24} radius="sm" />
          <div css={{ marginTop: '6px', div: { margin: '1px 0px' } }}>
            <Skeleton width={200} height={18} radius="sm" />
            <Skeleton width={100} height={18} radius="sm" />
          </div>
        </div>
        <div>
          <Skeleton width={37} height={54} radius="sm" css={{ margin: '0 16px 0 6px' }} />
        </div>
      </div>
    </li>
  );
};

export const CommunityBoardArticleTableSkeleton = ({
  firstHeader = 'topic',
}: {
  firstHeader?: 'topic' | 'board';
}) => {
  const ArticleSkeletons = Array.from({ length: 20 }, (_, idx) => (
    <CommunityBoardArticleSkeleton key={'CommunityBoardArticleSkeleton' + idx} />
  ));
  const ArticleMobileSkeleton = Array.from({ length: 20 }, (_, idx) => (
    <CommunityBoardArticleMobileSkeleton key={'CommunityBoardArticleMobileSkeleton' + idx} />
  ));

  return (
    <div css={{ padding: '0 20px', '@media(max-width: 768px)': { padding: 0 } }}>
      <CommunityBoardArticleTableHeader firstHeader={firstHeader} />
      {ArticleSkeletons}
      {ArticleMobileSkeleton}
    </div>
  );
};

const PopularBoardItemSkeleton = () => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
        height: '33px',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <Skeleton width={20} height={18} ml={17} mr={14} radius="sm" />
      <Skeleton width={100} height={18} radius="sm" />
      <span css={{ position: 'absolute', right: '15px' }}>
        <Skeleton width={28} height={18} radius="sm" />
      </span>
    </div>
  );
};

export const PopularBoardsSkeleton = () => {
  return Array.from({ length: 50 }, (_, idx) => (
    <PopularBoardItemSkeleton key={'Popular Board Item Skeleton' + idx} />
  ));
};

const BestPostItemSkeleton = () => {
  return (
    <div
      css={{
        width: '100%',
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <span css={{ margin: '0 17px' }}>
        <Skeleton width={24} height={16} radius="sm" />
      </span>
      <span css={{ width: 180, marginRight: 35 }}>
        <Skeleton width={160} height={16} radius="sm" />
      </span>
      <span>
        <Skeleton width={36} height={16} radius="sm" />
      </span>
    </div>
  );
};

export const BestPostsSkeleton = () => {
  return Array.from({ length: 10 }, (_, idx) => (
    <BestPostItemSkeleton key={'Best Post Item Skeleton' + idx} />
  ));
};

const HorizontalBestNoticeSkeleton = () => {
  return (
    <div
      css={{
        width: '100%',
        height: 30,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: 'start',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <span>
        <Skeleton width={16} height={20} radius="sm" />
      </span>
      <span>
        <Skeleton width={168} height={20} radius="sm" />
      </span>
      <span>
        <Skeleton width={16} height={20} radius="sm" />
      </span>
    </div>
  );
};

export const HorizontalBestNoticesSkeleton = () => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: 5 }, (_, idx) => (
        <HorizontalBestNoticeSkeleton key={'HorizontalBestNoticeSkeleton' + idx} />
      ))}
    </div>
  );
};

const NotificationBoardSkeleton = () => {
  return (
    <div
      css={{
        width: '100%',
        height: 30,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: 'start',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <span>
        <Skeleton width={16} height={20} radius="sm" />
      </span>
      <span>
        <Skeleton width={168} height={20} radius="sm" />
      </span>
      <span>
        <Skeleton width={16} height={20} radius="sm" />
      </span>
    </div>
  );
};

export const NotificationBoardsSkeleton = () => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: 5 }, (_, idx) => (
        <NotificationBoardSkeleton key={'HorizontalBestNoticeSkeleton' + idx} />
      ))}
    </div>
  );
};
