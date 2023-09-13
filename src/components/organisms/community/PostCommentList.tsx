import { OrderType } from '@/types/common';
import { CommunityCommentListItemType, CommunityPost_CommentListItemType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { useRouter } from 'next/router';
import { UnstyledButton } from '@/components/atoms';
import { useState } from 'react';

type PostCommentListProps = {
  identity: string;
  commentTotalCount: string | number;
  commentList: Array<CommunityPost_CommentListItemType>;
};

const PostCommentList = ({ identity, commentTotalCount, commentList }: PostCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 1;
  const hasNextPage = 20 * page < Number(commentTotalCount);
  const showMoreCommentOnClick = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: Number(page) + 1 },
      },
      undefined,
      { scroll: false }
    );
  };
  return (
    <ul data-role="comments">
      {commentList.map((comment) => {
        return (
          <PostCommentListItem key={comment.COMMENT_IDX} identity={identity} comment={comment} />
        );
      })}
      {hasNextPage && (
        <UnstyledButton
          type="button"
          w={'100%'}
          h={60}
          fz={16}
          fw={600}
          onClick={showMoreCommentOnClick}
          css={{ color: '#999' }}
        >
          다음 댓글 더보기
        </UnstyledButton>
      )}
    </ul>
  );
};

export default PostCommentList;
