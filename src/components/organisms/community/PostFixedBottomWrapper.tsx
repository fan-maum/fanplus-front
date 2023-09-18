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
};

const PostFixedBottomWrapper = ({
  identity,
  texts,
  postInfo,
  commentTotalCount,
  onCreateComment,
}: PostFixedBottomWrapperProps) => {
  const { POST_IDX, WRITER_PROFILE_IMG } = postInfo;
  return (
    <div
      css={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '2px solid #F1F1F1',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      <CommentRegister
        identity={identity}
        texts={texts}
        POST_IDX={POST_IDX}
        WRITER_PROFILE_IMG={WRITER_PROFILE_IMG}
        createMode={'post'}
        onCreateComment={onCreateComment}
      />
      <CommunityPostBottomNavi commentTotalCount={commentTotalCount} />
    </div>
  );
};

export default PostFixedBottomWrapper;
