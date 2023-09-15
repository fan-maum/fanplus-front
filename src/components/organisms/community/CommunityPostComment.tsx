import { useState } from 'react';
import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommentListItemType } from '@/types/community';
import PostCommentList from './PostCommentList';

type CommunityPostCommentProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentList: CommentListItemType[];
  commentTotalCount: number;
  setCommentList: any;
  orderType: OrderType;
  setOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
};

const CommunityPostComment = ({
  getCommentParams,
  commentList,
  commentTotalCount,
  setCommentList,
  orderType,
  setOrderType,
  onCreateComment,
}: CommunityPostCommentProps) => {
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders
          getCommentParams={getCommentParams}
          orderType={orderType}
          setOrderType={setOrderType}
          setCommentList={setCommentList}
        />
      </Group>
      <PostCommentList
        getCommentParams={getCommentParams}
        commentTotalCount={commentTotalCount}
        commentList={commentList}
        setCommentList={setCommentList}
        onCreateComment={onCreateComment}
      />
    </>
  );
};

export default CommunityPostComment;
