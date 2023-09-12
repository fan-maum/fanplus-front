import styled from '@emotion/styled';
import { Center, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import { CommunityPost_PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { deleteRecommends, postLikes, postRecommends } from '@/api/Community';

type CommunityPostDetailProps = {
  identity: string;
  postInfo: CommunityPost_PostInfoItemType;
  texts: CommunityPostTextType;
};

const CommunityPostDetail = ({ identity, postInfo, texts }: CommunityPostDetailProps) => {
  const RecommendOnClick = async () => {
    // const res = await postRecommends(identity, postInfo.POST_IDX);
    const res = await deleteRecommends(identity, postInfo.POST_IDX);
    // eslint-disable-next-line no-console
    console.log(res);
  };
  return (
    <Stack p={'24px 22px'} spacing={140} css={{ borderBottom: '6px solid #f1f1f1' }}>
      <PostContents dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
      <Center mb={8}>
        <LikesButton
          text={`${texts.recommend} ${postInfo.RECOMMEND_CNT}`}
          recommendYN={postInfo.RECOMMEND_YN}
          onClick={RecommendOnClick}
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
