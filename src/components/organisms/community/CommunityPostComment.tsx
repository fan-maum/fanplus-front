import { useState } from 'react';
import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommunityPost_CommentListItemType } from '@/types/community';
import PostCommentList from './PostCommentList';

type CommunityPostCommentProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentList: Array<CommunityPost_CommentListItemType>;
  commentTotalCount: string | number;
  data: any;
  setData: any;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => void;
};

const CommunityPostComment = ({
  getCommentParams,
  commentList,
  commentTotalCount,
  data,
  setData,
  onCreateComment,
}: CommunityPostCommentProps) => {
  const [commentOrder, setCommentOrder] = useState<OrderType>('newest');

  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders
          getCommentParams={getCommentParams}
          commentOrder={commentOrder}
          setCommentOrder={setCommentOrder}
          setData={setData}
        />
      </Group>
      <PostCommentList
        getCommentParams={getCommentParams}
        commentTotalCount={commentTotalCount}
        commentList={commentList}
        data={data}
        setData={setData}
        onCreateComment={onCreateComment}
      />
    </>
  );
};

export default CommunityPostComment;
