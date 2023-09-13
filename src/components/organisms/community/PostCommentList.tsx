import { CommunityCommentListItemType, CommunityCommentResponseType, CommunityPost_CommentListItemType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { useRouter } from 'next/router';
import { UnstyledButton } from '@/components/atoms';
import { getCommunityPostCommentData } from '@/api/Community';
import { BackLangType, TargetType } from '@/types/common';

type PostCommentListProps = {
  getCommentParams: {target_type: TargetType, target: string, lang: BackLangType, identity: string},
  identity: string;
  commentTotalCount: string | number;
  commentList: Array<CommunityPost_CommentListItemType>;
  testData: any;
  data: any,
  setData: any,
};

const PostCommentList = ({
  getCommentParams,
  identity,
  commentTotalCount,
  commentList,
  testData,
  data,
  setData,
}: PostCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 1;
  const hasNextPage = 20 * page < Number(commentTotalCount);
 
  const showMoreCommentOnClick = async () => {
    console.log(getCommentParams);
    
    const getRes:CommunityCommentResponseType = await getCommunityPostCommentData(getCommentParams.target_type, getCommentParams.target, 'newest', getCommentParams.lang, 0, identity, 10);
    const comments = getRes.RESULTS.DATAS.COMMENTS;
    setData([...testData, ...comments])
  };
  return (
    <ul data-role="comments">
      {testData.map((comment: any) => {
        return (
          <PostCommentListItem key={comment.COMMENT_IDX} identity={identity} comment={comment} />
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
