import { deleteRecommends, postRecommends } from '@/api/Community';
import { Group, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import ShareButton from '@/components/atoms/ShareButton';
import PostDetailCopyUrl from '@/components/molecules/community/PostDetailCopyUrl';
import { colors } from '@/styles/CommunityColors';
import { UrlLangType } from '@/types/common';
import type { PostInfoItemType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

type CommunityPostDetailProps = {
  identity: string;
  postInfo: PostInfoItemType;
  urlLang: UrlLangType;
  texts: CommunityPostTextType;
  setPostLikeState: React.Dispatch<React.SetStateAction<number>>;
  shareOnClick: () => void;
};

const CommunityPostDetail = ({
  identity,
  postInfo,
  urlLang,
  texts,
  setPostLikeState,
  shareOnClick,
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

  const handleListButton = () => {
    if (router.query.from === '2291') {
      router.push(`/${urlLang}/community/board/${router.query.from}/`);
    } else if (router.query.from === 'community') {
      router.push(`/${urlLang}/community`);
    } else {
      router.push(`/${urlLang}/community/board/${router.query.boardIndex}/`);
    }
  };
  return (
    <>
      <PostDetailCopyUrl texts={texts} key={postInfo.POST_IDX} />
      <Stack p={'24px 22px'} spacing={200} css={{ borderBottom: `2px solid ${colors.gray[200]}` }}>
        <PostContents dangerouslySetInnerHTML={{ __html: postInfo.POST_CONTENTS }} />
        <Group position="apart">
          <div></div>
          <LikesButton
            text={texts.recommend}
            recommended={recommended}
            recommendedCount={recommendedCount}
            onClick={RecommendOnClick}
          />
          <ShareButton onClick={shareOnClick} css={{ background: 'none', width: 32, height: 32 }} />
        </Group>
      </Stack>
      <ListButtonWrapper>
        <button onClick={handleListButton}>{texts.postList}</button>
      </ListButtonWrapper>
    </>
  );
};

export default CommunityPostDetail;

const PostContents = styled.div`
  position: 'relative';
  img {
    max-width: 100%;
  }
  iframe {
    max-width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }
  pre,
  span {
    white-space: break-spaces;
  }
  word-break: break-word;
`;
const ListButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0;
  padding: 0 20px;
  button {
    outline: none;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${colors.gray[200]};
    background-color: #fff;
    padding: 5px 8px;
    color: ${colors.gray[600]};
    font-size: 14px;
    font-weight: 600;
  }
`;
