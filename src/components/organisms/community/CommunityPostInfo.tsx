import { Stack } from '@/components/atoms';
import TopicBubble from '@/components/atoms/TopicBubble';
import CommunityPostInfoState from '@/components/molecules/community/CommunityPostInfoState';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';

type CommunityPostInfoProps = {
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  postLikeState: number;
};

const CommunityPostInfo = ({ postInfo, texts, postLikeState }: CommunityPostInfoProps) => {
  return (
    <Stack spacing={12} p={20} css={{ borderBottom: '2px solid #f1f1f1' }}>
      <div css={{ display: 'flex' }}>
        <TopicBubble height={32} p={8} radius={20} name={postInfo.TOPIC_NAME} />
        {postInfo.HAS_POPULAR_BADGE === '1' && (
          <TopicBubble height={32} p={8} radius={20} hightlight={true} name={texts.popular} />
        )}
      </div>
      <div
        css={{
          paddingTop: 10,
          color: '#000',
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        {postInfo.POST_TITLE}
      </div>
      <CommunityPostInfoState postInfo={postInfo} texts={texts} postLikeState={postLikeState} />
    </Stack>
  );
};

export default CommunityPostInfo;
