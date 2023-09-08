import { Center, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import { CommunityPost_PostInfoItemType } from '@/types/community';

type CommunityPostDetailProps = {
  postInfo: CommunityPost_PostInfoItemType;
};

const CommunityPostDetail = ({ postInfo }: CommunityPostDetailProps) => {
  return (
    <Stack p={'24px 22px'} spacing={140} css={{ borderBottom: '6px solid #f1f1f1' }}>
      <div dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
      <Center mb={8}>
        <LikesButton
          text={`추천 ${postInfo.RECOMMEND_CNT}`}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('clicked');
          }}
        />
      </Center>
    </Stack>
  );
};

export default CommunityPostDetail;
