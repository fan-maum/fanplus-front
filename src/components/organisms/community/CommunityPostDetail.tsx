import styled from '@emotion/styled';
import { Center, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import { CommunityPost_PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';

type CommunityPostDetailProps = {
  postInfo: CommunityPost_PostInfoItemType;
  texts: CommunityPostTextType;
};

const CommunityPostDetail = ({ postInfo, texts }: CommunityPostDetailProps) => {
  return (
    <Stack p={'24px 22px'} spacing={140} css={{ borderBottom: '6px solid #f1f1f1' }}>
      <PostContents dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
      <Center mb={8}>
        <LikesButton
          text={`${texts.recommend} ${postInfo.RECOMMEND_CNT}`}
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

const PostContents = styled.div`
  position: 'relative';
  img {
    width: 100%;
  }
`;
