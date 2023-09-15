import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { PostResponseType, CommentResponseType, CommentListItemType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import PostFixedBottomWrapper, {
  PostFixedBottomWrapperProps,
} from '@/components/organisms/community/PostFixedBottomWrapper';
import CommunityDeleteModal from '@/components/modals/CommunityDeleteModal';
import { getComments, postComment } from '@/api/Community';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import PostDetailLayout, { PostDetailLayoutProps } from './PostDetailLayout';
import PostCommentWrapper, {
  PostCommentWrapperProps,
} from '@/components/organisms/community/PostCommentWrapper';

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
  const [page, setPage] = useState(1);
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

  const [deleteModalBlock, setDeleteModalBlock] = useState(false);
  const deletePostOnClick = () => {
    setDeleteModalBlock(true);
  };

  const onCreateComment = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    setPage(1);
    // const response = await postComment(identity, target_type, target, contents);
    // const comment_idx = response.RESULTS.DATAS.COMMENT_IDX;
    const getCommentResponse: CommentResponseType = await getComments(
      target,
      identity,
      board_lang,
      orderType,
      page - 1,
      20
    );
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    setCommentList(comments);
  };
  console.log(commentList);

  const onCreateReply = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    // const response = await postComment(identity, target_type, target, contents);
    // const comment_idx = response.RESULTS.DATAS.COMMENT_IDX;
    const getCommentResponse: CommentResponseType = await getComments(
      getCommentParams.target,
      getCommentParams.identity,
      board_lang,
      orderType,
      0,
      20
    );
    // const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    // setCommentList(comments);
    // console.log(commentList);

    // const comment: any = commentList.find(
    //   (comment) => parseInt(comment.COMMENT_IDX as string) === comment_idx
    // );

    // setCommentList([comment, ...commentList]);
    // setCommentList([...commentList, comment]);
  };

  let getCommentParams = {
    target_type: 'post' as TargetType,
    target: parseInt(postInfo.POST_IDX as string),
    lang: lang,
    identity: identity,
  };

  /**
   * LayoutProps
   */
  const PostDetailLayoutProps: PostDetailLayoutProps = {
    identity,
    postInfo,
    texts,
    deletePostOnClick,
  };

  const PostCommentWrapperProps: PostCommentWrapperProps = {
    getCommentParams,
    commentList,
    commentTotalCount,
    setCommentList,
    orderType,
    page,
    setPage,
    setOrderType,
    onCreateComment,
  };

  const PostFixedBottomWrapperProps: PostFixedBottomWrapperProps = {
    identity,
    postInfo,
    commentTotalCount,
    onCreateComment,
  };

  return (
    <>
      <Layout>
        <LayoutInner>
          <PostDetailLayout {...PostDetailLayoutProps} />
          <PostCommentWrapper {...PostCommentWrapperProps} />
        </LayoutInner>
        <PostFixedBottomWrapper {...PostFixedBottomWrapperProps} />
      </Layout>
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

const Layout = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const LayoutInner = styled.div`
  width: 100%;
  max-width: 768px;
  position: relative;
  margin: 0 auto;
  padding-bottom: 192px;
`;
