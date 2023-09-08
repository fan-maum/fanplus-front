import { useState } from 'react';
import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { OrderType } from '@/types/common';
import { CommunityCommentListItemType } from '@/types/community';
import PostCommentList from './PostCommentList';

type CommunityPostCommentProps = {
  commentList: Array<CommunityCommentListItemType>;
  commentTotalCount: number;
};

const CommunityPostComment = ({ commentList, commentTotalCount }: CommunityPostCommentProps) => {
  const [commentOrder, setCommentOrder] = useState<OrderType>('newest');
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders commentOrder={commentOrder} setCommentOrder={setCommentOrder} />
      </Group>
      <PostCommentList
        commentTotalCount={commentTotalCount}
        commentList={commentList}
        commentOrder={commentOrder}
      />
      {/* 
      <>
        <div>댓글입력 및 공유 Bottom Bar</div>;
        <FormComment variables={{ postID, commentsOrderBy }} anonymity={anonymity} />
        <>PostDetailMenuIconWrapper</>
      </> */}
    </>
  );
};

export default CommunityPostComment;
