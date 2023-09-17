import { CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { BackLangType, TargetType } from '@/types/common';

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
};

const PostCommentList = ({
  getCommentParams,
  comments,
  onCreateComment,
}: PostCommentListProps) => {
  const comment = comments.RESULTS.DATAS.COMMENTS;
  return (
    <ul data-role="comments">
      {comment && comment.map((item: any, index) => (
          <PostCommentListItem
          key={`${index}`}
          getCommentParams={getCommentParams}
          item={item}
          onCreateComment={onCreateComment}
        />
        )
      )}
    </ul>
  );
};

export default PostCommentList;
