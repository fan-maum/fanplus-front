import IconImage from '@/components/atoms/IconImage';
import type { PostListItemType } from '@/types/community';
import { formatWrittenTimeLite } from '@/utils/util';
import Link from 'next/link';

type OwnPropType = {
  postItem: PostListItemType;
  link: string;
};

const CommunityBoardArticle = ({ postItem, link }: OwnPropType) => {
  const timeExpression = formatWrittenTimeLite(postItem.PUBLISH_DATE);
  const commentCount = Number(postItem.COMMENT_CNT) > 999 ? '[+999]' : `[${postItem.COMMENT_CNT}]`;

  return (
    <li
      css={{
        '@media (max-width: 768px)': { display: 'none' },
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <Link
        href={link}
        css={{
          display: 'flex',
          alignItems: 'center',
          height: '44px',
          font: 'normal 12px/14px Pretendard',
        }}
      >
        <div css={{ width: 106, textAlign: 'center' }}>{postItem.TOPIC_NAME}</div>
        <div css={{ width: 310, paddingLeft: 20, display: 'flex', alignItems: 'center' }}>
          <span>{postItem.POST_TITLE}</span>
          {postItem.POST_IMG_YN === 'Y' && <IconImage />}
          <span css={{ fontWeight: 500, color: '#ff5656', marginLeft: '2px' }}>{commentCount}</span>
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
    </li>
  );
};

export default CommunityBoardArticle;
