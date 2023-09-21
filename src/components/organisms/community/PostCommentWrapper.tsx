import { Group, UnstyledButton } from '@/components/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentListState, pageState } from '@/store/community';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';
import PostCommentList from './PostCommentList';
import { CommunityPostTextType } from '@/types/textTypes';

export type PostCommentWrapperProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  texts: CommunityPostTextType;
  commentTotalCount: number;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  refetch: () => void;
  replyRefetch: () => void;
  fetchNextPage: () => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
};

const PostCommentWrapper = ({
  getCommentParams,
  texts,
  commentTotalCount,
  onCreateComment,
  refetch,
  replyRefetch,
  fetchNextPage,
  showReportModalBlockOnClick,
  refetchReplyOnToggle,
  replyData,
}: PostCommentWrapperProps) => {
  const commentList = useRecoilValue(commentListState);
  const [page, setPage] = useRecoilState(pageState);
  const hasNextPage = 20 * (page + 1) < Number(commentTotalCount);

  return (
    <>
      <Group h={80} position="apart" px={24} mb={15}>
        <PostCommentCount count={commentTotalCount} />
        <PostCommentOrders texts={texts} refetch={refetch} />
      </Group>
      <>
        {commentList.map((comments, index) => (
          <PostCommentList
            key={index}
            getCommentParams={getCommentParams}
            comments={comments}
            texts={texts}
            onCreateComment={onCreateComment}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
            refetch={refetch}
            replyRefetch={replyRefetch}
            refetchReplyOnToggle={refetchReplyOnToggle}
            replyData={replyData}
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
