import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import { PurPoseType, TargetType } from '@/types/common';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';

export type PostDetailLayoutProps = {
  identity: string;
  user_idx: string;
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const PostDetailLayout = ({
  identity,
  user_idx,
  postInfo,
  texts,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: PostDetailLayoutProps) => {
  return (
    <>
      <CommunityPostTopNavi
        identity={identity}
        user_idx={user_idx}
        writer_idx={postInfo.WRITER_IDX}
        texts={texts}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
        postIndex={postInfo.POST_IDX}
      />
      <CommunityPostInfo postInfo={postInfo} texts={texts} />
      <CommunityPostDetail identity={identity} postInfo={postInfo} texts={texts} />
    </>
  );
};

export default PostDetailLayout;
