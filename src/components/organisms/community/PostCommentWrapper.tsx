import { Group, UnstyledButton } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommentResponseType } from '@/types/community';
import PostCommentList from './PostCommentList';

export type PostCommentWrapperProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentList: CommentResponseType[];
  commentTotalCount: number;
  setCommentList: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  orderTypeState: {
    orderType: OrderType;
    setOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
  };
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  refetch: () => void;
  fetchNextPage: () => void;
};

const PostCommentWrapper = ({
  getCommentParams,
  commentList,
  commentTotalCount,
  setCommentList,
  page,
  setPage,
  orderTypeState,
  onCreateComment,
  refetch,
  fetchNextPage,
}: PostCommentWrapperProps) => {
  const hasNextPage = 20 * (page + 1) < Number(commentTotalCount);
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders orderTypeState={orderTypeState} setPage={setPage} refetch={refetch} />
      </Group>
      <>
      {commentList.map((comments, index) => (
        <PostCommentList
        key={index}
        getCommentParams={getCommentParams}
        comments={comments}
        onCreateComment={onCreateComment}
      />
      ))}
      {hasNextPage && (
        <UnstyledButton
          type="button"
          w={'100%'}
          h={60}
          fz={16}
          fw={600}
          onClick={() => {
            setPage(page + 1);
            fetchNextPage();
          }}
          css={{ color: '#999' }}
        >
          다음 댓글 더보기
        </UnstyledButton>
      )}
      </>
    </>
  );
};

export default PostCommentWrapper;
