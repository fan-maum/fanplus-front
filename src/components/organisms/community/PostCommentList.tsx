import {
  CommunityCommentListItemType,
  CommunityCommentResponseType,
  CommunityPost_CommentListItemType,
} from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { UnstyledButton } from '@/components/atoms';
import { getCommunityPostCommentData, getCommunityUnAuthPostCommentData } from '@/api/Community';
import { BackLangType, TargetType } from '@/types/common';
import { useState } from 'react';

type PostCommentListProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentTotalCount: string | number;
  commentList: Array<CommunityPost_CommentListItemType>;
  data: Array<CommunityCommentListItemType>;
  setData: React.Dispatch<React.SetStateAction<Array<CommunityCommentListItemType>>>;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => void;
};

const PostCommentList = ({
  getCommentParams,
  commentTotalCount,
  commentList,
  data,
  setData,
  onCreateComment,
}: PostCommentListProps) => {
  const [pagingNumber, setPagingNumber] = useState(1);
  const hasNextPage = 10 * pagingNumber < Number(commentTotalCount);

  // const getCommentData = async () => {
  //   let getCommentResponse: CommunityCommentResponseType;
  //   getCommentParams.identity !== null
  //     ? (getCommentResponse = await getCommunityPostCommentData(
  //         getCommentParams.target_type,
  //         String(getCommentParams.target),
  //         'newest',
  //         getCommentParams.lang,
  //         pagingNumber,
  //         getCommentParams.identity,
  //         10
  //       ))
  //     : (getCommentResponse = await getCommunityUnAuthPostCommentData(
  //         getCommentParams.target_type,
  //         getCommentParams.target,
  //         'newest',
  //         'ko-en-ja-es-vi-id-zh-zhtw',
  //         getCommentParams.lang,
  //         pagingNumber,
  //         10
  //       ));
  //   return getCommentResponse;
  // };

  const showMoreCommentOnClick = async () => {
    let getCommentResponse: CommunityCommentResponseType;
    getCommentParams.identity !== null
      ? (getCommentResponse = await getCommunityPostCommentData(
          getCommentParams.target_type,
          String(getCommentParams.target),
          'newest',
          getCommentParams.lang,
          pagingNumber,
          getCommentParams.identity,
          10
        ))
      : (getCommentResponse = await getCommunityUnAuthPostCommentData(
          getCommentParams.target_type,
          getCommentParams.target,
          'newest',
          'ko-en-ja-es-vi-id-zh-zhtw',
          getCommentParams.lang,
          pagingNumber,
          10
        ));
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    setData([...data, ...comments]);
    setPagingNumber(pagingNumber + 1);
  };
  return (
    <ul data-role="comments">
      {data.map((comment: any, index) => {
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
