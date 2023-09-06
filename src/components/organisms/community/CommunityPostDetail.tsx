import { Button, Center, Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import TopicBubble from '@/components/atoms/TopicBubble';
import PostInfoState from '@/components/molecules/community/postInfoState';
import { CommunityPost_PostInfoItemType } from '@/types/community';

type CommunityPostDetailProps = {
  postInfo: CommunityPost_PostInfoItemType;
};

const CommunityPostDetail = ({ postInfo }: CommunityPostDetailProps) => {
  return (
    <Stack p={'24px 22px'} spacing={30}>
      <div dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
      <Center mb={8}>
        <LikesButton
          text={`추천 ${postInfo.RECOMMEND_CNT}`}
          onClick={() => console.log('clicked')}
        />
      </Center>

      {/* <Center css={{ padding: 6 }}>
        <UnstyledButton
          h={56}
          px={30}
          fz={20}
          fw={600}
          css={{
            borderRadius: '5px',
            border: '2px solid #D9D9D9',
            color: '#999',
          }}
        >
          {postInfo.POST_CONTENTS}
          추천
        </UnstyledButton>
      </Center> */}
    </Stack>
  );
};

export default CommunityPostDetail;
