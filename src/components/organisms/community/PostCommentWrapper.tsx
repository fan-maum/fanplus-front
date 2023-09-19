import { Group, UnstyledButton } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, OrderType, PurPoseType, TargetType } from '@/types/common';
import { CommentResponseType } from '@/types/community';
import PostCommentList from './PostCommentList';
import { CommunityPostTextType } from '@/types/textTypes';

export type PostCommentWrapperProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentList: CommentResponseType[];
  texts: CommunityPostTextType;
  profileInfo: { profileImg: string; profileNick: string };
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
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const PostCommentWrapper = ({
  getCommentParams,
  commentList,
  texts,
  profileInfo,
  commentTotalCount,
  setCommentList,
  page,
  setPage,
  orderTypeState,
  onCreateComment,
  refetch,
  fetchNextPage,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: PostCommentWrapperProps) => {
  const hasNextPage = 20 * (page + 1) < Number(commentTotalCount);
  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders
          orderTypeState={orderTypeState}
          texts={texts}
          setPage={setPage}
          refetch={refetch}
        />
      </Group>
      <>
        {commentList.map((comments, index) => (
          <PostCommentList
            key={index}
            getCommentParams={getCommentParams}
            comments={comments}
            texts={texts}
            profileInfo={profileInfo}
            onCreateComment={onCreateComment}
            showModalBlockOnClick={showModalBlockOnClick}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
            refetch={refetch}
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
            {texts.showMoreComments}
          </UnstyledButton>
        )}
      </>
    </>
  );
};

export default PostCommentWrapper;
