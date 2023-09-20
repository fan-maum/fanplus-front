import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { commentListState, modalBlockState, orderTypeState, selectInfoState } from '@/store/community';
import type { PostResponseType, userResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import PostFixedBottomWrapper, {
  PostFixedBottomWrapperProps,
} from '@/components/organisms/community/PostFixedBottomWrapper';
import { getUser, postComment } from '@/api/Community';
import { BackLangType, TargetType, PurPoseType } from '@/types/common';
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
  const setCommentList = useSetRecoilState(commentListState);
  const setSelectInfo = useSetRecoilState(selectInfoState);
  const [user, setUser] = useState<userResponseType>();
  const [commentTotalCount, setCommentTotalCount] = useState<number>(0);
  const profileImg = user
    ? user?.RESULTS.DATAS.PROFILE_IMG_URL
    : 'http://cdnetphoto.appphotocard.com/profile_images/profile_image_default.png';
  const profileNick = user ? user?.RESULTS.DATAS.NICK : '';
  const profileInfo = { profileImg, profileNick };
  const [doneModalMessage, setDoneModalMessage] = useState<any>();
  const [commentIndex, setCommentIndex] = useState<number | null>(null);

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
  const { data, isSuccess, isLoading, refetch, error, fetchNextPage } =
    useGetCommentQuery(useGetCommentQueryProps);

  const refetchReplyOnToggle = async (commentIndex: number | null) => {
    await setCommentIndex(commentIndex);
    await replyRefetch();
  };

  const [modalBlock, setModalBlock] = useRecoilState(modalBlockState);
  const [reportModalBlock, setReportModalBlock] = useState(false);
  const [doneModalBlock, setDoneModalBlock] = useState(false);
  const [shareModalIsOpened, setShareModalIsOpened] = useState(false);
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);

  const fetchGetUser = async () => {
    if (identity !== null) {
      const response: userResponseType = await getUser(user_idx, identity);
      setUser(response);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      fetchGetUser();
      setCommentList(data.pages);
      setCommentTotalCount(data.pages[0].RESULTS.DATAS.TOTAL_CNT);
    }
  }, [isSuccess, data]);

  if (isLoading) return '';
  if (error) return 'An error has occurred: ' + error;

  const showReportModalBlockOnClick = async (
    purpose: PurPoseType,
    target_type: TargetType,
    idx: string
  ) => {
    setReportModalBlock(true);
    setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
  };

  const onCreateComment = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    await postComment(identity, target_type, target, contents);
    await refetch();
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
    user_idx,
    postInfo,
    texts,
    showReportModalBlockOnClick,
  };

  const PostCommentWrapperProps: PostCommentWrapperProps = {
    getCommentParams,
    texts,
    profileInfo,
    commentTotalCount,
    replyData,
    onCreateComment,
    refetch,
    replyRefetch,
    fetchNextPage,
    showReportModalBlockOnClick,
    refetchReplyOnToggle,
  };

  const PostFixedBottomWrapperProps: PostFixedBottomWrapperProps = {
    identity,
    texts,
    postInfo,
    commentTotalCount,
    profileInfo,
    onCreateComment,
    shareOnClick: () => setShareModalIsOpened(true),
  };

  const communityShareModalProps: CommunityShareModalProps = {
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
          <PostDetailLayout {...PostDetailLayoutProps} />
          <PostCommentWrapper {...PostCommentWrapperProps} />
        </LayoutInner>
        <PostFixedBottomWrapper {...PostFixedBottomWrapperProps} />
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
      <CommunityShareModal {...communityShareModalProps} />
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