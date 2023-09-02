import Link from 'next/link';
import type { PostListItemType } from '@/types/community';
import IconPopular from '../atoms/IconPopular';
import { CommunityBoardTextType } from '@/types/textTypes';

type OwnPropType = {
  postItem: PostListItemType;
  link: string;
  texts: CommunityBoardTextType;
};

const CommunityBoardArticle = ({ postItem, link, texts }: OwnPropType) => {
  const writtenTime = postItem.PUBLISH_DATE;
  return (
    <li css={{ margin: '6px 12px', padding: '3px 0px 6px', borderBottom: '1px solid #d9d9d9' }}>
      <Link href={link}>
        <div css={{ display: 'flex' }}>
          <TopicBubble name={postItem.TOPIC_NAME as string} />
          {postItem.HAS_POPULAR_BADGE === '1' && <TopicBubble name={texts.popular} hightlight />}
        </div>
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
          <div css={{ margin: '3px 3px 6px' }}>
            <h4 css={{ wordBreak: 'keep-all', lineHeight: '1.5', fontWeight: '400' }}>
              {postItem.POST_TITLE}
              {postItem.COMMENT_CNT !== '0' && (
                <span css={{ color: '#ff5656', fontWeight: '400' }}> [{postItem.COMMENT_CNT}]</span>
              )}
            </h4>
            <div css={{ color: '#999999', fontSize: '12px', lineHeight: '1.5', marginTop: '6px' }}>
              <p>
                {postItem.WRITER_NAME} | {writtenTime}
              </p>
              <p>
                {texts.viewCount} {postItem.VIEW_CNT} {texts.recommendCount}{' '}
                {postItem.RECOMMEND_CNT}
              </p>
            </div>
          </div>
          {postItem.POST_IMG_YN === 'Y' && <ThumbnailImage src={postItem.SUMNAIL_IMG} />}
        </div>
      </Link>
    </li>
  );
};

export default CommunityBoardArticle;

const TopicBubble = ({ name, hightlight }: { name: string; hightlight?: boolean }) => {
  return (
    <div
      css={{
        width: 'fit-content',
        height: '24px',
        borderRadius: '12px',
        padding: '3px 6px',
        marginRight: '6px',
        backgroundColor: hightlight ? '#fcdede' : '#f2f4f5',
        color: hightlight ? '#ff5656' : '#999999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
      }}
    >
      {hightlight && <IconPopular />}
      {name}
    </div>
  );
};

const ThumbnailImage = ({ src }: { src: string }) => {
  return (
    <div
      css={{
        width: '72px',
        height: '72px',
        overflow: 'hidden',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginLeft: '12px',
        backgroundColor: '#fbfbfb',
      }}
    >
      <img src={src} alt="썸네일" css={{ height: '80px', width: 'auto' }} />
    </div>
  );
};
