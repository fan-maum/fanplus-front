import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useGetBestPostsQuery } from '@/server/useGetBestPostsQuery';
import { CommunityBestNoticesTexts } from '@/texts/communityBestNoticesTexts';
import Link from 'next/link';
import { useState } from 'react';
import BestNoticeItem from './BestNoticeItem';
import BestNoticesSortBubbles from './BestNoticesSortBubbles';
import { BestPostsSkeleton } from './CommunitySkeleton';

export type BestPostsViewType = 'daily' | 'weekly' | 'monthly' | 'comment' | 'recommend';

const BestNotices = () => {
  const urlLang = useUrlLanguage();
  const serverLang = useServerLang();
  const texts = CommunityBestNoticesTexts[urlLang];

  const [viewType, setViewType] = useState<BestPostsViewType>('daily');

  const { data, isFetching } = useGetBestPostsQuery(serverLang, viewType);
  const bestPosts = data?.RESULTS.DATAS.BEST_POST_LIST;

  return (
    <div
      css={{
        width: '328px',
        height: '100%',
        border: '1px solid #d9d9d9',
        borderBottom: 'none',
        '@media (max-width: 960px)': { display: 'none' },
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f8f8f9',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
          padding: '14px 15px 15px 20px',
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
      <BestNoticesSortBubbles currentSortMode={viewType} setViewType={setViewType} texts={texts} />
      {isFetching && <BestPostsSkeleton />}
      {bestPosts?.map((post, idx) => {
        return (
          <BestNoticeItem
            key={'BestNotice' + idx}
            rank={idx + 1}
            boardIndex={Number(post.BOARD_IDX)}
            postIndex={Number(post.POST_IDX)}
            postTitle={post.POST_TITLE}
            comments={Number(post.COMMENT_CNT)}
          />
        );
      })}
    </div>
  );
};

export default BestNotices;
