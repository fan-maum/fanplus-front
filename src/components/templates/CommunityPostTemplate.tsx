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
import { getCommunityPostCommentData, postCommentResult } from '@/api/Community';
import { BackLangType, TargetType } from '@/types/common';

export type CommunityPostPropType = {
  identity: string;
  lang: BackLangType;
  communityPostData: CommunityPostResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({
  identity,
  lang,
  communityPostData,
  texts,
}: CommunityPostPropType) => {
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const commentList = communityPostData.RESULTS.DATAS.COMMENT_LIST;
  const commentTotalCount = communityPostData.RESULTS.DATAS.POST_INFO.COMMENT_CNT;
  // eslint-disable-next-line no-console
  console.log('commentListFromPost => ', communityPostData.RESULTS.DATAS.COMMENT_LIST);
  // eslint-disable-next-line no-console
  console.log('postInfo => ', postInfo);
  // eslint-disable-next-line no-console
  console.log('commentTotalCount => ', commentTotalCount);
  const [deleteModalBlock, setDeleteModalBlock] = useState(false);
  const deletePostOnClick = () => {
    setDeleteModalBlock(true);
  };
  const CommunityPostTopNaviProps: CommunityPostTopNaviProps = {
    texts,
    deletePostOnClick,
  };
  const [data, setData] = useState(commentList);
  const [dataId, setDataId] = useState<number>(0);
  const [replyId, setReplyId] = useState<number>(0);

  const onCreateComment = async (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => {
    const res = await postCommentResult(identity, target_type, target, contents);
    const results = res.data;
    const comment_idx = results.RESULTS.DATAS.COMMENT_IDX;
    setDataId(comment_idx);

    const getRes: CommunityCommentResponseType = await getCommunityPostCommentData(
      target_type,
      target,
      'newest',
      lang,
      0,
      identity,
      20
    );
    const comments = getRes.RESULTS.DATAS.COMMENTS;
    const comment: any = comments.find(
      (comment) => parseInt(comment.COMMENT_IDX as string) === comment_idx
    );
    setData([comment, ...data]);
  };

  const onCreateReply = async (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => {
    const res = await postCommentResult(identity, target_type, target, contents);
    const results = res.data;
    const comment_idx = results.RESULTS.DATAS.COMMENT_IDX;
    setDataId(comment_idx);

    const getRes: CommunityCommentResponseType = await getCommunityPostCommentData(
      target_type,
      target,
      'newest',
      lang,
      0,
      identity,
      20
    );
    const comments = getRes.RESULTS.DATAS.COMMENTS;
    const comment: any = comments.find(
      (comment) => parseInt(comment.COMMENT_IDX as string) === comment_idx
    );
    setData([comment, ...data]);
  };

  let getCommentParams = {
    target_type: 'post' as TargetType,
    target: parseInt(postInfo.POST_IDX as string),
    lang: lang,
    identity: identity,
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
            getCommentParams={getCommentParams}
            commentList={commentList}
            commentTotalCount={commentTotalCount}
            data={data}
            setData={setData}
            onCreateComment={onCreateComment}
          />
        </div>
        <CommunityPostFixedAreaWrapper
          identity={identity}
          POST_IDX={postInfo.POST_IDX}
          WRITER_PROFILE_IMG={postInfo.WRITER_PROFILE_IMG}
          commentTotalCount={commentTotalCount}
          onCreateComment={onCreateComment}
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
