import { useRouter } from 'next/router';
import type { CommunityPostResponseType, CommunityCommentResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostComment from '@/components/organisms/community/CommunityPostComment';

export type CommunityPostPropType = {
  communityPostData: CommunityPostResponseType;
  communityPostCommentData: CommunityCommentResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({
  communityPostData,
  communityPostCommentData,
  texts,
}: CommunityPostPropType) => {
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const commentList = communityPostCommentData.RESULTS.DATAS.COMMENTS;
  const commentTotalCount = communityPostCommentData.RESULTS.DATAS.TOTAL_CNT;
  const commentPage = communityPostCommentData.RESULTS.DATAS.PAGE;
  const headList = communityPostData.RESULTS.DATAS.HEAD_LIST;
  // eslint-disable-next-line no-console
  console.log('commentListFromPost => ', communityPostData.RESULTS.DATAS.COMMENT_LIST);
  // eslint-disable-next-line no-console
  console.log('commentList => ', communityPostCommentData.RESULTS.DATAS.COMMENTS);
  // eslint-disable-next-line no-console
  // console.log(headList);
  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
      }}
    >
      <div>
        <CommunityPostTopNavi />
        <CommunityPostInfo postInfo={postInfo} />
        <CommunityPostDetail postInfo={postInfo} />
        <CommunityPostComment commentList={commentList} commentTotalCount={commentTotalCount} />
      </div>
    </div>
  );
};

export default CommunityPostTemplate;
