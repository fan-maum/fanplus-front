import type { CommunityPostResponseType, CommunityCommentResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostComment from '@/components/organisms/community/CommunityPostComment';
import CommunityPostFixedAreaWrapper from '@/components/organisms/community/CommunityPostFixedAreaWrapper';

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
  // eslint-disable-next-line no-console
  console.log('postInfo => ', postInfo);
  return (
    <>
      <div
        css={{
          position: 'relative',
          width: '100%',
          margin: '0px auto',
        }}
      >
        <div
          css={{
            maxWidth: '768px',
            margin: '0px auto',
            position: 'relative',
            width: '100%',
            paddingBottom: 192,
          }}
        >
          <CommunityPostTopNavi />
          <CommunityPostInfo postInfo={postInfo} texts={texts} />
          <CommunityPostDetail postInfo={postInfo} texts={texts} />
          <CommunityPostComment commentList={commentList} commentTotalCount={commentTotalCount} />
        </div>
        <CommunityPostFixedAreaWrapper
          WRITER_PROFILE_IMG={postInfo.WRITER_PROFILE_IMG}
          commentTotalCount={commentTotalCount}
        />
      </div>
    </>
  );
};

export default CommunityPostTemplate;
