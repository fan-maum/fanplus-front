import { Stack } from '@/components/atoms';
import TopicBubble from '@/components/atoms/TopicBubble';
import PostInfoState from '@/components/molecules/community/postInfoState';
import { CommunityPost_PostInfoItemType } from '@/types/community';

type CommunityPostInfoProps = {
  postInfo: CommunityPost_PostInfoItemType;
};

const CommunityPostInfo = ({ postInfo }: CommunityPostInfoProps) => {
  return (
    <Stack spacing={12} p={20} css={{ borderBottom: '2px solid #f1f1f1' }}>
      <div css={{ display: 'flex' }}>
        <TopicBubble height={32} p={8} radius={20} name={postInfo.TOPIC_NAME} />
        {postInfo.HAS_POPULAR_BADGE && (
          <TopicBubble height={32} p={8} radius={20} hightlight={true} name={'인기'} />
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
      <PostInfoState postInfo={postInfo} />
    </Stack>
  );
};

export default CommunityPostInfo;
