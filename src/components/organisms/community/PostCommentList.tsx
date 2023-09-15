import { CommentListItemType, CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { UnstyledButton } from '@/components/atoms';
import { getComments } from '@/api/Community';
import { BackLangType, TargetType } from '@/types/common';
import { useState } from 'react';

type PostCommentListProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentTotalCount: number;
  commentList: Array<CommentListItemType>;
  setCommentList: React.Dispatch<React.SetStateAction<Array<CommentListItemType>>>;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
};

const PostCommentList = ({
  getCommentParams,
  commentTotalCount,
  commentList,
  setCommentList,
  onCreateComment,
}: PostCommentListProps) => {
  const [pagingNumber, setPagingNumber] = useState(1);
  const hasNextPage = 20 * pagingNumber < Number(commentTotalCount);
  const showMoreCommentOnClick = async () => {
    const board_lang = 'ALL';
    const getCommentResponse: CommentResponseType = await getComments(
      getCommentParams.target,
      getCommentParams.identity,
      board_lang,
      'newest',
      pagingNumber,
      20
    );
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    setCommentList([...commentList, ...comments]);
    setPagingNumber(pagingNumber + 1);
  };
  return (
    <ul data-role="comments">
      {commentList.map((comment: any, index) => {
        return (
          <PostCommentListItem
            key={`${comment.COMMENT_IDX}_${index}`}
            getCommentParams={getCommentParams}
            comment={comment}
            onCreateComment={onCreateComment}
          />
        );
      })}
      {hasNextPage && (
        <UnstyledButton
          type="button"
          w={'100%'}
          h={60}
          fz={16}
          fw={600}
          onClick={showMoreCommentOnClick}
          css={{ color: '#999' }}
        >
          다음 댓글 더보기
        </UnstyledButton>
      )}
    </ul>
  );
};

export default PostCommentList;
