import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import { BoardInfoType, PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { useState } from 'react';
import PostDetailHeader from '../organisms/community/PostDetailHeader';
import { UrlLangType } from '@/types/common';

export type PostDetailLayoutProps = {
  urlLang: UrlLangType;
  identity: string;
  user_idx: string;
  postInfo: PostInfoItemType;
  boardInfo: BoardInfoType;
  texts: CommunityPostTextType;
  shareOnClick: () => void;
};

const PostDetailLayout = ({
  urlLang,
  identity,
  user_idx,
  postInfo,
  boardInfo,
  texts,
  shareOnClick,
}: PostDetailLayoutProps) => {
  const [postLikeState, setPostLikeState] = useState<number>(
    parseInt(postInfo.RECOMMEND_CNT as string)
  );

  return (
    <>
      <PostDetailHeader
        identity={identity}
        user_idx={user_idx}
        urlLang={urlLang}
        postInfo={postInfo}
        boardInfo={boardInfo}
        postLikeState={postLikeState}
        texts={texts}
      />
      <CommunityPostDetail
        identity={identity}
        postInfo={postInfo}
        texts={texts}
        setPostLikeState={setPostLikeState}
        shareOnClick={shareOnClick}
      />
    </>
  );
};

export default PostDetailLayout;
