import IconImage from '@/components/atoms/IconImage';
import type { NoticeListItemType, PostListItemType } from '@/types/community';
import { formatWrittenTimeLite } from '@/utils/util';
import Link from 'next/link';
import type { ReactNode } from 'react';

type OwnPropType = {
  postItem: PostListItemType | NoticeListItemType;
  link: string;
  firstHeader?: ReactNode;
  isNotice?: boolean;
};

const CommunityBoardArticle = ({ postItem, link, firstHeader, isNotice }: OwnPropType) => {
  const timeExpression =
    postItem.PUBLISH_DATE !== null ? formatWrittenTimeLite(postItem.PUBLISH_DATE) : 0;
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
        backgroundColor: isNotice ? '#fff6f6' : 'transparent',
      }}
    >
      <div css={{ width: 106, textAlign: 'center' }}>{firstHeader}</div>
      <div css={{ flex: 1, paddingLeft: 20, display: 'flex', alignItems: 'center' }}>
        <span
          css={{
            maxWidth: 240,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
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
