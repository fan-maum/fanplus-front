import styled from '@emotion/styled';
import { Center, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { deleteRecommends, postRecommends } from '@/api/Community';
import { useState } from 'react';
import { useRouter } from 'next/router';

type CommunityPostDetailProps = {
  identity: string;
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  setPostLikeState: React.Dispatch<React.SetStateAction<number>>;
};

const CommunityPostDetail = ({
  identity,
  postInfo,
  texts,
  setPostLikeState,
}: CommunityPostDetailProps) => {
  const router = useRouter();
  const [recommended, setRecommended] = useState(postInfo.RECOMMEND_YN);
  const [recommendedCount, setRecommendedCount] = useState<number>(
    parseInt(postInfo.RECOMMEND_CNT as string)
  );
  const RecommendOnClick = async () => {
    if (identity !== null) {
      if (recommended === 'Y') {
        await deleteRecommends(identity, postInfo.POST_IDX);
        setRecommended('N');
        setRecommendedCount((prev) => prev - 1);
        setPostLikeState((prev) => prev - 1);
      } else {
        await postRecommends(identity, postInfo.POST_IDX);
        setRecommended('Y');
        setRecommendedCount((prev) => prev + 1);
        setPostLikeState((prev) => prev + 1);
      }
    } else {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
    }
  };
  return (
    <Stack p={'24px 22px'} spacing={140} css={{ borderBottom: '6px solid #f1f1f1' }}>
      <PostContents dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
      <Center mb={8}>
        <LikesButton
          text={texts.recommend}
          recommended={recommended}
          recommendedCount={recommendedCount}
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
