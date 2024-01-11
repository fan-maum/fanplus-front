import TopicBubble from '@/components/atoms/TopicBubble';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import type { UrlLangType } from '@/types/common';
import type { NoticeListItemType, PostListItemType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { formatWrittenTimeLite } from '@/utils/util';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type OwnPropType = {
  postItem: NoticeListItemType;
  firstHeader: ReactNode;
  link: string;
  texts: CommunityBoardTextType;
  isNotice?: boolean;
  showTopic?: boolean;
};
const CommunityBoardNoticeArticleMobile = ({
  postItem,
  firstHeader,
  link,
  texts,
  isNotice,
}: OwnPropType) => {
  const timeExpression =
    postItem.PUBLISH_DATE !== null ? formatWrittenTimeLite(postItem.PUBLISH_DATE) : 0;

  return (
    <Link
      href={link}
      css={{
        '@media (min-width: 768px)': { display: 'none' },
        display: 'block',
        height: 100,
        padding: '16px',
        backgroundColor: isNotice ? '#fff6f6' : 'transparent',
      }}
    >
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div css={{ margin: '3px 3px 6px', lineHeight: '1.5', width: '70%' }}>
          <div css={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div>{firstHeader}</div>
            <h4
              css={{
                wordBreak: 'break-word',
                fontWeight: '400',
                maxWidth: '80%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {postItem.POST_TITLE}
            </h4>
          </div>
          <div css={{ color: '#999999', fontSize: '12px', marginTop: '6px' }}>
            <p css={{ marginBottom: '4px' }}>
              <span css={{ color: '#000' }}>{postItem.WRITER_NAME}</span>
              {' | ' + timeExpression}
            </p>
            <p>
              <span>{texts.viewCount + ' ' + postItem.VIEW_CNT} </span>
              <span>{texts.recommendCount + ' ' + postItem.RECOMMEND_CNT}</span>
            </p>
          </div>
        </div>
        <div css={{ display: 'flex' }}>
          <CommentBox commentCount={postItem.COMMENT_CNT} text={texts.commentCount} />
        </div>
      </div>
    </Link>
  );
};

export default CommunityBoardNoticeArticleMobile;

const ThumbnailImage = ({ src }: { src: string }) => {
  return (
    <div
      css={{
        width: 54,
        height: 54,
        overflow: 'hidden',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: '#fbfbfb',
      }}
    >
      <img src={src} alt={'thumbnail' + src} css={{ height: 60, width: 'auto' }} />
    </div>
  );
};

const CommentBox = ({ commentCount, text }: { commentCount: string; text: string }) => {
  const urlLang = useUrlLanguage();
  const fontStyle: Record<UrlLangType, CSSProperties['font']> = {
    ko: 'normal 12px/14px Pretendard',
    'zh-CN': 'normal 12px/14px Pretendard',
    'zh-TW': 'normal 12px/14px Pretendard',
    en: 'normal 6px/8px Pretendard',
    ja: 'normal 6px/8px Pretendard',
    vi: 'normal 6px/8px Pretendard',
    es: 'normal 6px/8px Pretendard',
    in: 'normal 6px/8px Pretendard',
  };
  return (
    <div
      css={{
        width: 37,
        height: 54,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 16px 0 6px',
        backgroundColor: '#f1f1f1',
        '@media (max-width: 768px)': { margin: '0' },
      }}
    >
      <p>{commentCount}</p>
      <p css={{ font: fontStyle[urlLang] }}>{text}</p>
    </div>
  );
};
