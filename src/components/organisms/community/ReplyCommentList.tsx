import { OrderType } from '@/types/common';
import { CommunityCommentListItemType, CommunityPost_CommentListItemType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { useRouter } from 'next/router';
import { UnstyledButton } from '@/components/atoms';
import { useState } from 'react';
import ReplyCommentListItem from './ReplyCommentListItem';

type ReplyCommentListProps = {
  identity: string;
  totalCount?: string | number;
  replyList: Array<CommunityCommentListItemType>;
};

const ReplyCommentList = ({ identity, totalCount, replyList }: ReplyCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 1;
  return (
    <ul data-role="comments">
      {replyList?.map((reply) => {
        return (
          <ReplyCommentListItem key={reply.COMMENT_IDX} identity={identity} reply={reply} />
        );
      })}
    </ul>
  );
};

export default ReplyCommentList;
