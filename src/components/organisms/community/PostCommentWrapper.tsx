import { Group, UnstyledButton } from '@/components/atoms';
import { useRecoilState } from 'recoil';
import { pageState } from '@/store/community';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { TargetType } from '@/types/common';
import PostCommentList from './PostCommentList';
import { CommunityPostTextType } from '@/types/textTypes';
import { CommentResponseType } from '@/types/community';

export type PostCommentWrapperProps = {
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
  refetchReplyOnToggle: (commentIndex: number) => void;
  commentData: any;
  replyData: any;
};

const PostCommentWrapper = ({
  texts,
  commentTotalCount,
  onCreateComment,
  refetch,
  replyRefetch,
  fetchNextPage,
  refetchReplyOnToggle,
  commentData,
  replyData,
}: PostCommentWrapperProps) => {
  const commentList: Array<CommentResponseType> = commentData.pages;

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
            comments={comments}
            texts={texts}
            onCreateComment={onCreateComment}
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
