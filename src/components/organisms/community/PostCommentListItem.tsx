import { OrderType } from '@/types/common';
import { CommunityCommentListItemType } from '@/types/community';
import CommentCard from './CommentCard';

type PostCommentListItemProps = {
  comment: CommunityCommentListItemType;
};

const PostCommentListItem = ({ comment }: PostCommentListItemProps) => {
  return (
    <li className="comment">
      <CommentCard
        comment={comment}
        // {...comment}
        // postID={postID}
        // blocked={blocked}
        // replyOpen={reply.open}
        // handleReplyWriteClick={handleReplyWriteClick}
        // handleReplyToggleClick={handleReplyToggleClick}
        // anonymity={anonymity}
      />
      <div>
        {/* {reply.write && (
          <FormComment
            uniqueKey={`comment-${comment.id}`}
            variables={{ postID, parentID: comment.id, commentsOrderBy }}
            anonymity={anonymity}
          />
        )}
        {reply.open && comment.childCommentCount > 0 && (
          <ScreenCommentReplyList
            postID={postID}
            childComment={comment.childComment}
            anonymity={anonymity}
          />
        )} */}
      </div>
    </li>
  );
};

export default PostCommentListItem;
