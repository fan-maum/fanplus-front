import { CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';

type PostCommentListProps = {
  comments: CommentResponseType;
  texts: CommunityPostTextType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  refetch: () => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
  replyRefetch: () => void;
};

const PostCommentList = ({
  comments,
  texts,
  onCreateComment,
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
            item={item}
            texts={texts}
            refetch={refetch}
            replyRefetch={replyRefetch}
            onCreateComment={onCreateComment}
            refetchReplyOnToggle={refetchReplyOnToggle}
            replyData={replyData}
          />
        ))}
    </ul>
  );
};

export default PostCommentList;
