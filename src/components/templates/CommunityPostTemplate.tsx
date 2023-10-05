import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  modalBlockState,
  orderTypeState,
  postParamState,
  postParamStateType,
  reportModalBlockState,
  userState,
} from '@/store/community';
import type { PostResponseType, userResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import PostFixedBottomWrapper, {
  PostFixedBottomWrapperProps,
} from '@/components/organisms/community/PostFixedBottomWrapper';
import { postComment } from '@/api/Community';
import { BackLangType, TargetType } from '@/types/common';
import PostDetailLayout, { PostDetailLayoutProps } from './PostDetailLayout';
import PostCommentWrapper, {
  PostCommentWrapperProps,
} from '@/components/organisms/community/PostCommentWrapper';
import CommunityBlockModal from '@/components/modals/CommunityBlockModal';
import CommunityDoneModal from '../modals/CommunityDoneModal';
import CommunityReportModal from '../modals/CommunityReportModal';
import CompletedShareModal, { CompletedShareModalProps } from '../modals/CompletedShareModal';
import CommunityShareModal, { CommunityShareModalProps } from '../modals/CommunityShareModal';
import {
  useGetCommentQuery,
  useGetCommentQueryProps,
  useGetReplyQuery,
  useGetReplyQueryProps,
  useGetUserQuery,
  useGetUserQueryProps,
} from '@/server/useGetCommentsQuery';

const CommunityPostTemplate = ({
  identity,
  user_idx,
  postIndex,
  lang,
  communityPostData,
  texts,
}: CommunityPostPropType) => {
  const board_lang = 'ALL';
  const per_page = 20;
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const orderType = useRecoilValue(orderTypeState);
  const setUser = useSetRecoilState(userState);
  const [commentIndex, setCommentIndex] = useState<number | null>(null);
  const [doneModalMessage, setDoneModalMessage] = useState<any>();
  const [modalBlock, setModalBlock] = useRecoilState(modalBlockState);
  const [reportModalBlock, setReportModalBlock] = useRecoilState(reportModalBlockState);
  const [doneModalBlock, setDoneModalBlock] = useState(false);
  const [shareModalIsOpened, setShareModalIsOpened] = useState(false);
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);
  const setPostParam = useSetRecoilState(postParamState);

  let postParamObject: postParamStateType = {
    target_type: 'post',
    target: parseInt(postInfo.POST_IDX as string),
    lang: lang,
    identity: identity,
  };

  const useGetReplyQueryProps: useGetReplyQueryProps = {
    commentIndex,
    identity,
    board_lang,
    orderType,
    per_page,
  };

  const { data: replyData, refetch: replyRefetch } = useGetReplyQuery(useGetReplyQueryProps);
  const useGetCommentQueryProps: useGetCommentQueryProps = {
    postIndex,
    identity,
    board_lang,
    orderType,
    per_page,
  };
  const {
    data: commentData,
    isSuccess,
    isLoading,
    refetch,
    error,
    fetchNextPage,
  } = useGetCommentQuery(useGetCommentQueryProps);

  const commentTotalCount = commentData?.pages[0].RESULTS.DATAS.TOTAL_CNT;

  const refetchReplyOnToggle = async (commentIndex: number | null) => {
    await setCommentIndex(commentIndex);
    await replyRefetch();
  };

  const useGetUserQueryProps: useGetUserQueryProps = {
    user_idx,
    identity,
  };
  const { data: userInfo, isFetched } = useGetUserQuery(useGetUserQueryProps);

  useEffect(() => {
    isFetched && setUser(userInfo);
    if (isSuccess) {
      setPostParam(postParamObject);
    }
  }, [isSuccess, isFetched, postParamObject]);

  if (isLoading) return '';
  // if (error) return 'An error has occurred: ' + error;

  const onCreateComment = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    await postComment(identity, target_type, target, contents);
    await refetch();
  };

  /**
   * LayoutProps
   */
  const layoutProps: PostDetailLayoutProps = {
    identity,
    user_idx,
    postInfo,
    texts,
  };

  const commentProps: PostCommentWrapperProps = {
    texts,
    commentTotalCount,
    commentData,
    replyData,
    onCreateComment,
    refetch,
    replyRefetch,
    fetchNextPage,
    refetchReplyOnToggle,
  };

  const fixedBottomProps: PostFixedBottomWrapperProps = {
    identity,
    texts,
    postInfo,
    commentTotalCount,
    onCreateComment,
    shareOnClick: () => setShareModalIsOpened(true),
  };

  const shareModalProps: CommunityShareModalProps = {
    opened: shareModalIsOpened,
    postTitle: postInfo.POST_TITLE,
    onClose: () => setShareModalIsOpened(false),
    confirmModalOpened: () => setCompletedShareModalIsOpen(true),
  };

  const completedShareModalProps: CompletedShareModalProps = {
    opened: completedShareModalIsOpen,
    onClose: () => setCompletedShareModalIsOpen(false),
  };

  return (
    <>
      <Layout>
        <LayoutInner>
          <PostDetailLayout {...layoutProps} />
          <PostCommentWrapper {...commentProps} />
        </LayoutInner>
        <PostFixedBottomWrapper {...fixedBottomProps} />
      </Layout>
      <CommunityReportModal
        opened={reportModalBlock}
        texts={texts}
        setDoneModalMessage={setDoneModalMessage}
        onClose={() => {
          setReportModalBlock(false);
        }}
        identity={identity}
        setReportModalBlock={setReportModalBlock}
        setDoneModalBlock={setDoneModalBlock}
        refetch={refetch}
      />
      <CommunityBlockModal
        opened={modalBlock}
        onClose={() => {
          setModalBlock(false);
        }}
        texts={texts}
        identity={identity}
        setModalBlock={setModalBlock}
        setDoneModalBlock={setDoneModalBlock}
        setDoneModalMessage={setDoneModalMessage}
        refetch={refetch}
        replyRefetch={replyRefetch}
      />
      <CommunityDoneModal
        opened={doneModalBlock}
        doneModalMessage={doneModalMessage}
        onClose={async () => {
          setDoneModalMessage(null);
          setDoneModalBlock(false);
        }}
        texts={texts}
      />
      <CommunityShareModal {...shareModalProps} />
      <CompletedShareModal {...completedShareModalProps} />
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
  padding-bottom: 120px;
`;

export type CommunityPostPropType = {
  identity: string;
  user_idx: string;
  postIndex: number;
  lang: BackLangType;
  communityPostData: PostResponseType;
  texts: CommunityPostTextType;
};
