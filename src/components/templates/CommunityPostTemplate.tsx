import { useEffect, useState } from 'react';
import type { PostResponseType, CommentResponseType, CommentListItemType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import CommunityPostTopNavi, {
  CommunityPostTopNaviProps,
} from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostComment from '@/components/organisms/community/CommunityPostComment';
import CommunityPostFixedAreaWrapper from '@/components/organisms/community/CommunityPostFixedAreaWrapper';
import CommunityDeleteModal from '@/components/modals/CommunityDeleteModal';
import { getComments, postComment } from '@/api/Community';
import { BackLangType, OrderType, TargetType } from '@/types/common';

export type CommunityPostPropType = {
  identity: string;
  postIndex: number;
  lang: BackLangType;
  communityPostData: PostResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({
  identity,
  postIndex,
  lang,
  communityPostData,
  texts,
}: CommunityPostPropType) => {
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const [commentList, setCommentList] = useState<Array<CommentListItemType>>([]);
  const [commentTotalCount, setCommentTotalCount] = useState<number>(0);
  const [orderType, setOrderType] = useState<OrderType>('newest');
  const board_lang = 'ALL';
  useEffect(() => {
    const comments = async () => {
      let response: CommentResponseType = await getComments(
        postIndex,
        identity,
        board_lang,
        orderType,
        0,
        20
      );
      setCommentList(response.RESULTS.DATAS.COMMENTS);
      setCommentTotalCount(response.RESULTS.DATAS.TOTAL_CNT);
    };
    comments();
  }, [postIndex, identity, board_lang, orderType]);

  // eslint-disable-next-line no-console
  console.log('commentList => ', commentList);
  const [deleteModalBlock, setDeleteModalBlock] = useState(false);
  const deletePostOnClick = () => {
    setDeleteModalBlock(true);
  };
  const CommunityPostTopNaviProps: CommunityPostTopNaviProps = {
    texts,
    deletePostOnClick,
  };
  // const [data, setData] = useState(commentList);
  const [dataId, setDataId] = useState<number>(0);
  const [replyId, setReplyId] = useState<number>(0);

  const onCreateComment = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    const res = await postComment(identity, target_type, target, contents);
    const results = res.data;
    const comment_idx = results.RESULTS.DATAS.COMMENT_IDX;
    setDataId(comment_idx);
    const getCommentResponse: CommentResponseType = await getComments(
      target,
      identity,
      board_lang,
      'newest',
      0,
      20
    );
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    const comment: any = comments.find(
      (comment) => parseInt(comment.COMMENT_IDX as string) === comment_idx
    );
    setCommentList([comment, ...commentList]);
  };

  const onCreateReply = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    const res = await postComment(identity, target_type, target, contents);
    const results = res.data;
    const comment_idx = results.RESULTS.DATAS.COMMENT_IDX;
    setDataId(comment_idx);
    const getCommentResponse: CommentResponseType = await getComments(
      getCommentParams.target,
      getCommentParams.identity,
      board_lang,
      'newest',
      0,
      20
    );
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    const comment: any = comments.find(
      (comment) => parseInt(comment.COMMENT_IDX as string) === comment_idx
    );
    const comment2 = { id: comment_idx, contents };

    setCommentList([comment, ...commentList]);
    setCommentList([...commentList, comment]);
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
            setCommentList={setCommentList}
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
