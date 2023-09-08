import { OrderType } from '@/types/common';
import { CommunityCommentListItemType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { useRouter } from 'next/router';

type PostCommentListProps = {
  commentTotalCount: number;
  commentList: Array<CommunityCommentListItemType>;
};

const PostCommentList = ({ commentTotalCount, commentList }: PostCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 0;
  const hasNextPage = commentList.length * (page + 1) < commentTotalCount;

  return (
    <ul data-role="comments">
      {commentList.map((comment) => {
        return <PostCommentListItem key={comment.COMMENT_IDX} comment={comment} />;
      })}
      {hasNextPage && <button type="button">다음 댓글 더보기</button>}
    </ul>
  );
};

export default PostCommentList;
