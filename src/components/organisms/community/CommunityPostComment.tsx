import { useState } from 'react';
import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { OrderType } from '@/types/common';
import { CommunityCommentListItemType } from '@/types/community';
import PostCommentList from './PostCommentList';
import CommentRegister from './CommentRegister';

type CommunityPostCommentProps = {
  identity:string;
  commentList: Array<CommunityCommentListItemType>;
  commentTotalCount: number;
};

const CommunityPostComment = ({ identity, commentList, commentTotalCount }: CommunityPostCommentProps) => {
  const [commentOrder, setCommentOrder] = useState<OrderType>('newest');
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders commentOrder={commentOrder} setCommentOrder={setCommentOrder} />
      </Group>
      <PostCommentList identity={identity} commentTotalCount={commentTotalCount} commentList={commentList} />
    </>
  );
};

export default CommunityPostComment;
