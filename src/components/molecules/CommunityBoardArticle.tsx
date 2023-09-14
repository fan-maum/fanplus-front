import Link from 'next/link';
import type { PostListItemType } from '@/types/community';
import IconPopular from '../atoms/IconPopular';
import { CommunityBoardTextType } from '@/types/textTypes';
import { formatWrittenTime, timeType } from '@/utils/util';
import TopicBubble from '../atoms/TopicBubble';

type OwnPropType = {
  postItem: PostListItemType;
  link: string;
  texts: CommunityBoardTextType;
};

const CommunityBoardArticle = ({ postItem, link, texts }: OwnPropType) => {
  const writtenTime = formatWrittenTime(postItem.PUBLISH_DATE);
  const timeAppend: { [key in timeType]: string } = {
    Full: ' (KST)',
    Date: texts.daysAgo,
    Hour: texts.hoursAgo,
    Minute: texts.minsAgo,
  };
  const timeExpression = writtenTime.time + timeAppend[writtenTime.timeType];

  return (
    <li css={{ margin: '6px 12px', padding: '3px 0px 6px', borderBottom: '1px solid #d9d9d9' }}>
      <Link href={link}>
        <div css={{ display: 'flex' }}>
          <TopicBubble name={postItem.TOPIC_NAME as string} />
          {postItem.HAS_POPULAR_BADGE === '1' && <TopicBubble name={texts.popular} hightlight />}
        </div>
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
          <div css={{ margin: '3px 3px 6px', lineHeight: '1.5' }}>
            <h4 css={{ wordBreak: 'keep-all', fontWeight: '400' }}>
              {postItem.POST_TITLE}
              <span css={{ color: '#ff5656' }}> [{postItem.COMMENT_CNT}]</span>
            </h4>
            <div css={{ color: '#999999', fontSize: '12px', marginTop: '6px' }}>
              <p>{postItem.WRITER_NAME + ' | ' + timeExpression}</p>
              <p>
                <span>{texts.viewCount + ' ' + postItem.VIEW_CNT} </span>
                <span>{texts.recommendCount + ' ' + postItem.RECOMMEND_CNT}</span>
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
