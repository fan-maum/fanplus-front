import { useState } from 'react';
import type { CommunityPostResponseType, CommunityCommentResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import CommunityPostTopNavi, {
  CommunityPostTopNaviProps,
} from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostComment from '@/components/organisms/community/CommunityPostComment';
import CommunityPostFixedAreaWrapper from '@/components/organisms/community/CommunityPostFixedAreaWrapper';
import CommunityDeleteModal from '@/components/modals/CommunityDeleteModal';

export type CommunityPostPropType = {
  identity: string;
  communityPostData: CommunityPostResponseType;
  // communityPostCommentData: CommunityCommentResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({
  identity,
  communityPostData,
  // communityPostCommentData,
  texts,
}: CommunityPostPropType) => {
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const commentList = communityPostData.RESULTS.DATAS.COMMENT_LIST;
  const commentTotalCount = communityPostData.RESULTS.DATAS.POST_INFO.COMMENT_CNT;
  // eslint-disable-next-line no-console
  console.log('commentListFromPost => ', communityPostData.RESULTS.DATAS.COMMENT_LIST);
  // eslint-disable-next-line no-console
  console.log('postInfo => ', postInfo);
  const [deleteModalBlock, setDeleteModalBlock] = useState(false);
  const deletePostOnClick = () => {
    setDeleteModalBlock(true);
  };
  const CommunityPostTopNaviProps: CommunityPostTopNaviProps = {
    texts,
    deletePostOnClick,
  };
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
          <CommunityPostTopNavi {...CommunityPostTopNaviProps} />
          <CommunityPostInfo postInfo={postInfo} texts={texts} />
          <CommunityPostDetail identity={identity} postInfo={postInfo} texts={texts} />
          <CommunityPostComment
            identity={identity}
            commentList={commentList}
            commentTotalCount={commentTotalCount}
          />
        </div>
        <CommunityPostFixedAreaWrapper
          identity={identity}
          POST_IDX={postInfo.POST_IDX}
          WRITER_PROFILE_IMG={postInfo.WRITER_PROFILE_IMG}
          commentTotalCount={commentTotalCount}
        />
      </div>
      <CommunityDeleteModal
        opened={deleteModalBlock}
        onClose={() => {
          setDeleteModalBlock(false);
        }}
        texts={texts}
      />
    </>
  );
};

export default CommunityPostTemplate;
