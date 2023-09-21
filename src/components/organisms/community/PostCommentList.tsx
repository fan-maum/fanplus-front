import { CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';

type PostCommentListProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  comments: CommentResponseType;
  texts: CommunityPostTextType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  refetch: () => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
  replyRefetch: () => void;
};

const PostCommentList = ({
  getCommentParams,
  comments,
  texts,
  onCreateComment,
  showReportModalBlockOnClick,
  refetch,
  refetchReplyOnToggle,
  replyData,
  replyRefetch,
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
            texts={texts}
            refetch={refetch}
            replyRefetch={replyRefetch}
            onCreateComment={onCreateComment}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
            refetchReplyOnToggle={refetchReplyOnToggle}
            replyData={replyData}
          />
        ))}
    </ul>
  );
};

export default PostCommentList;
