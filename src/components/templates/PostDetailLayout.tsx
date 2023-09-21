import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import { PurPoseType, TargetType } from '@/types/common';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { useState } from 'react';

export type PostDetailLayoutProps = {
  identity: string;
  user_idx: string;
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const PostDetailLayout = ({
  identity,
  user_idx,
  postInfo,
  texts,
  showReportModalBlockOnClick,
}: PostDetailLayoutProps) => {
  const [postLikeState, setPostLikeState] = useState<number>(
    parseInt(postInfo.RECOMMEND_CNT as string)
  );

  return (
    <>
      <CommunityPostTopNavi
        identity={identity}
        user_idx={user_idx}
        writer_idx={postInfo.WRITER_IDX}
        texts={texts}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
        postIndex={postInfo.POST_IDX}
      />
      <CommunityPostInfo postInfo={postInfo} texts={texts} postLikeState={postLikeState} />
      <CommunityPostDetail
        identity={identity}
        postInfo={postInfo}
        texts={texts}
        setPostLikeState={setPostLikeState}
      />
    </>
  );
};

export default PostDetailLayout;
