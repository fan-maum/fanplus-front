import TopicBubble from '@/components/atoms/TopicBubble';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type { NoticeListItemType, PostListItemType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { formatWrittenTimeLite } from '@/utils/util';
import Link from 'next/link';
import type { CSSProperties } from 'react';

type OwnPropType = {
  postItem: PostListItemType;
  link: string;
  texts: CommunityBoardTextType;
  isNotice?: boolean;
  showTopic?: boolean;
};

const CommunityBoardArticleMobile = ({
  postItem,
  link,
  texts,
  isNotice,
  showTopic,
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
        <div
          css={{
            margin: '3px 3px 6px',
            lineHeight: '1.5',
            width: postItem.POST_IMG_YN === 'Y' ? '60%' : '70%',
          }}
        >
          <h4
            css={{
              wordBreak: 'break-word',
              fontWeight: '400',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {showTopic ? (
              <span>[{postItem.TOPIC_NAME}]</span>
            ) : (
              <span>[{postItem.BOARD_TITLE}]</span>
            )}{' '}
            {postItem.POST_TITLE}
          </h4>
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
        <div css={{ display: 'flex', gap: 10 }}>
          {postItem.POST_IMG_YN === 'Y' && <ThumbnailImage src={postItem.SUMNAIL_IMG} />}
          <CommentBox commentCount={postItem.COMMENT_CNT} text={texts.commentCount} />
        </div>
      </div>
    </Link>
  );
};

export default CommunityBoardArticleMobile;

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
    ko: '14px',
    'zh-CN': '12px',
    'zh-TW': '12px',
    en: '6px',
    ja: '6px',
    vi: '6px',
    es: '6px',
    in: '6px',
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
      <p css={{ fontSize: fontStyle[urlLang] }}>{text}</p>
    </div>
  );
};
