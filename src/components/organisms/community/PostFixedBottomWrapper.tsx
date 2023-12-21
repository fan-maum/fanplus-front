import CommunityPostBottomNavi from '@/components/molecules/community/CommunityPostBottomNavi';
import CommentRegister from './CommentRegister';
import { TargetType } from '@/types/common';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';

export type PostFixedBottomWrapperProps = {
  identity: string;
  texts: CommunityPostTextType;
  postInfo: PostInfoItemType;
  commentTotalCount: string | number;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  shareOnClick: () => void;
};

const PostFixedBottomWrapper = ({
  identity,
  texts,
  postInfo,
  commentTotalCount,
  onCreateComment,
  shareOnClick,
}: PostFixedBottomWrapperProps) => {
  const { POST_IDX } = postInfo;
  return (
    <div>
      <CommentRegister
        identity={identity}
        texts={texts}
        POST_IDX={POST_IDX}
        createMode={'post'}
        onCreateComment={onCreateComment}
      />
      <CommunityPostBottomNavi commentTotalCount={commentTotalCount} shareOnClick={shareOnClick} />
    </div>
  );
};

export default PostFixedBottomWrapper;
