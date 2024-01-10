import { UnstyledButton } from '@/components/atoms';
import { useRecoilState } from 'recoil';
import { pageState } from '@/store/community';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import PostCommentOrders from '@/components/molecules/community/PostCommentOrders';
import { TargetType } from '@/types/common';
import PostCommentList from './PostCommentList';
import { CommunityPostTextType } from '@/types/textTypes';
import { CommentResponseType } from '@/types/community';
import CommentRegister from './CommentRegister';
import styled from '@emotion/styled';

export type PostCommentWrapperProps = {
  identity: string;
  POST_IDX: string;
  commentTotalCount: number;
  commentData: any;
  replyData: any;
  texts: CommunityPostTextType;
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
};

const PostCommentWrapper = ({
  identity,
  POST_IDX,
  commentTotalCount,
  commentData,
  replyData,
  texts,
  onCreateComment,
  refetch,
  replyRefetch,
  fetchNextPage,
  refetchReplyOnToggle,
}: PostCommentWrapperProps) => {
  const commentList: Array<CommentResponseType> = commentData.pages;

  const [page, setPage] = useRecoilState(pageState);
  const hasNextPage = 20 * (page + 1) < Number(commentTotalCount);

  return (
    <div>
      <CommentRegisterWrapper>
        <PostCommentCount count={commentTotalCount} />
        <CommentRegister
          identity={identity}
          POST_IDX={POST_IDX}
          createMode={'post'}
          texts={texts}
          onCreateComment={onCreateComment}
        />
      </CommentRegisterWrapper>
      <PostCommentOrders texts={texts} refetch={refetch} />
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
    </div>
  );
};

export default PostCommentWrapper;

const CommentRegisterWrapper = styled.div`
  padding: 14px 20px;
`;
