import { useState } from 'react';
import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommunityCommentListItemType, CommunityPost_CommentListItemType } from '@/types/community';
import PostCommentList from './PostCommentList';
import CommentRegister from './CommentRegister';

type CommunityPostCommentProps = {
  getCommentParams: {target_type: TargetType, target: string, lang: BackLangType, identity: string},
  commentList: Array<CommunityPost_CommentListItemType>;
  commentTotalCount: string | number;
  testData: any;
  data:any
  setData:any
};

const CommunityPostComment = ({
  getCommentParams,
  commentList,
  commentTotalCount,
  testData,
  data,
  setData,
}: CommunityPostCommentProps) => {
  const [commentOrder, setCommentOrder] = useState<OrderType>('newest');
  // eslint-disable-next-line no-console
  console.log('testData',testData);
  
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders getCommentParams={getCommentParams} commentOrder={commentOrder} setCommentOrder={setCommentOrder} />
      </Group>
      <PostCommentList
      getCommentParams={getCommentParams} 
        identity={getCommentParams.identity}
        commentTotalCount={commentTotalCount}
        commentList={commentList}
        testData={testData}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default CommunityPostComment;
