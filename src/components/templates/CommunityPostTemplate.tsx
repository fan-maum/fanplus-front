import { postComment } from '@/api/Community';
import CommunityBlockModal from '@/components/modals/CommunityBlockModal';
import PostCommentWrapper, {
  PostCommentWrapperProps,
} from '@/components/organisms/community/PostCommentWrapper';
import PostFixedBottomWrapper, {
  PostFixedBottomWrapperProps,
} from '@/components/organisms/community/PostFixedBottomWrapper';
import type { CommunityPostPropType } from '@/pages/[locale]/community/board/[boardIndex]/[postIndex]';
import {
  useGetCommentQuery,
  useGetCommentQueryProps,
  useGetReplyQuery,
  useGetReplyQueryProps,
  useGetUserQuery,
  useGetUserQueryProps,
} from '@/server/useGetCommentsQuery';
import {
  modalBlockState,
  orderTypeState,
  postParamState,
  postParamStateType,
  reportModalBlockState,
  userState,
} from '@/store/community';
import { communityPostTexts } from '@/texts/communityPostTexts';
import type { TargetType } from '@/types/common';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CommunityDoneModal from '../modals/CommunityDoneModal';
import CommunityReportModal from '../modals/CommunityReportModal';
import CommunityShareModal, { CommunityShareModalProps } from '../modals/CommunityShareModal';
import CompletedShareModal, { CompletedShareModalProps } from '../modals/CompletedShareModal';
import PostDetailLayout, { PostDetailLayoutProps } from './PostDetailLayout';
import CommunityLayout from './CommunityLayout';

const CommunityPostTemplate = ({
  urlLang,
  identity,
  user_idx,
  postIndex,
  serverLang,
  communityPostData,
}: CommunityPostPropType) => {
  const texts = communityPostTexts[urlLang];

  const board_lang = 'ALL';
  const per_page = 20;
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const boardInfo = communityPostData.RESULTS.DATAS.BOARD_INFO;
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
    lang: serverLang,
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
    boardInfo,
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
      <CommunityLayout>
        <LayoutInner>
          <PostDetailLayout {...layoutProps} />
          <PostCommentWrapper {...commentProps} />
        </LayoutInner>
        <PostFixedBottomWrapper {...fixedBottomProps} />
      </CommunityLayout>
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

const LayoutInner = styled.div`
  width: 100%;
  max-width: 768px;
  position: relative;
  margin: 0 auto;
  padding-bottom: 120px;
`;
