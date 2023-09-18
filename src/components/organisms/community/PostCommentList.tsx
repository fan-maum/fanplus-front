import { CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';

type PostCommentListProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  comments: CommentResponseType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  refetch: () => void;
};

const PostCommentList = ({
  getCommentParams,
  comments,
  onCreateComment,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
  refetch,
}: PostCommentListProps) => {
  const comment = comments.RESULTS.DATAS.COMMENTS;
  return (
    <ul data-role="comments">
      {comment &&
        comment.map((item: any, index) => (
          <PostCommentListItem
            key={`${index}`}
            getCommentParams={getCommentParams}
            item={item}
            onCreateComment={onCreateComment}
            showModalBlockOnClick={showModalBlockOnClick}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
            refetch={refetch}
          />
        ))}
    </ul>
  );
};

export default PostCommentList;
