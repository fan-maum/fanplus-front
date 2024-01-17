import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useGetBestPostsQuery } from '@/server/useGetBestPostsQuery';
import { CommunityBestNoticesTexts } from '@/texts/communityBestNoticesTexts';
import Link from 'next/link';
import { useState } from 'react';
import { HorizontalBestNoticesSkeleton } from './CommunitySkeleton';
import HorizontalBestNoticeItem from './HorizontalBestNoticeItem';
import HorizontalBestNoticesSortBubbles from './HorizontalBestNoticesSortBubbles';

export type BestPostsViewType = 'daily' | 'weekly' | 'monthly' | 'comment' | 'recommend';

const HorizontalBestNotices = () => {
  const urlLang = useUrlLanguage();
  const serverLang = useServerLang();
  const texts = CommunityBestNoticesTexts[urlLang];

  const [viewType, setViewType] = useState<BestPostsViewType>('daily');

  const { data, isFetching } = useGetBestPostsQuery(serverLang, viewType);
  const highRank = data?.RESULTS.DATAS.BEST_POST_LIST.slice(0, 5);
  const lowRank = data?.RESULTS.DATAS.BEST_POST_LIST.slice(5, 10);

  return (
    <div
      css={{
        minWidth: 520,
        height: 260,
        padding: '22px 20px',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '16px',
        }}
      >
        {texts.title}
        <Link
          href={`/${urlLang}/community/board/2291/`}
          css={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
        >
          {texts.seeMore}
          <span css={{ fontSize: '13px', marginLeft: '2px', fontWeight: '500' }}>{'>'}</span>
        </Link>
      </div>
      <HorizontalBestNoticesSortBubbles
        currentSortMode={viewType}
        setViewType={setViewType}
        texts={texts}
      />
      {isFetching && (
        <div css={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
          <HorizontalBestNoticesSkeleton />
          <HorizontalBestNoticesSkeleton />
        </div>
      )}
      <div
        css={{
          width: '100%',
          display: 'flex',
          gap: 40,
        }}
      >
        <ul css={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
          {highRank?.map((post, index) => {
            return (
              <HorizontalBestNoticeItem
                key={'HighRankBestNotice' + index}
                rank={index + 1}
                boardIndex={Number(post.BOARD_IDX)}
                postIndex={Number(post.POST_IDX)}
                postTitle={post.POST_TITLE}
                comments={Number(post.COMMENT_CNT)}
              />
            );
          })}
        </ul>
        <ul css={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
          {lowRank?.map((post, index) => {
            return (
              <HorizontalBestNoticeItem
                key={'LowRankBestNotice' + index}
                rank={index + 6}
                boardIndex={Number(post.BOARD_IDX)}
                postIndex={Number(post.POST_IDX)}
                postTitle={post.POST_TITLE}
                comments={Number(post.COMMENT_CNT)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HorizontalBestNotices;
