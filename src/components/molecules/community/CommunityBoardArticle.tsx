import IconImage from '@/components/atoms/IconImage';
import type { PostListItemType } from '@/types/community';
import { formatCommentCount, formatWrittenTimeLite } from '@/utils/util';
import Link from 'next/link';

type OwnPropType = {
  postItem: PostListItemType;
  firstHeader?: 'topic' | 'board';
  link: string;
};

const CommunityBoardArticle = ({ postItem, firstHeader = 'topic', link }: OwnPropType) => {
  const timeExpression = formatWrittenTimeLite(postItem.PUBLISH_DATE);
  const commentCount = Number(postItem.COMMENT_CNT) <= 999 ? Number(postItem.COMMENT_CNT) : '+999';

  return (
    <Link
      href={link}
      css={{
        '@media (max-width: 768px)': { display: 'none' },
        display: 'flex',
        alignItems: 'center',
        height: '44px',
        font: 'normal 14px/16px Pretendard',
      }}
    >
      {firstHeader === 'board' ? (
        <div css={{ width: 106, textAlign: 'center' }}>{postItem.BOARD_TITLE}</div>
      ) : (
        <div css={{ width: 106, textAlign: 'center' }}>{postItem.TOPIC_NAME}</div>
      )}
      <div
        css={{ minWidth: 200, flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center' }}
      >
        <span css={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {postItem.POST_TITLE}
        </span>
        {postItem.POST_IMG_YN === 'Y' && <IconImage />}
        {!!commentCount && (
          <span css={{ fontWeight: 500, color: '#ff5656', marginLeft: '2px' }}>
            [{commentCount}]
          </span>
        )}
      </div>
      <div css={{ width: 78, textAlign: 'center' }}>
        <p
          css={{
            width: '54px',
            margin: '0 auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {postItem.WRITER_NAME}
        </p>
      </div>
      <div css={{ width: 82, textAlign: 'center' }}>{timeExpression}</div>
      <div css={{ width: 78, textAlign: 'center' }}>{postItem.VIEW_CNT}</div>
      <div css={{ width: 74, textAlign: 'center' }}>{postItem.RECOMMEND_CNT}</div>
    </Link>
  );
};

export default CommunityBoardArticle;
