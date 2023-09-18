import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from '@emotion/styled';
import type { PostResponseType, CommentResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import PostFixedBottomWrapper, {
  PostFixedBottomWrapperProps,
} from '@/components/organisms/community/PostFixedBottomWrapper';
import { deleteComment, getComments, getReplies, postComment } from '@/api/Community';
import { BackLangType, OrderType, TargetType, PurPoseType, selectInfoType } from '@/types/common';
import PostDetailLayout, { PostDetailLayoutProps } from './PostDetailLayout';
import PostCommentWrapper, {
  PostCommentWrapperProps,
} from '@/components/organisms/community/PostCommentWrapper';
import CommunityBlockModal from '@/components/modals/CommunityBlockModal';
import CommunityDoneModal from '../modals/CommunityDoneModal';
import CommunityReportModal from '../modals/CommunityReportModal';

export type CommunityPostPropType = {
  identity: string;
  user_idx: string;
  postIndex: number;
  lang: BackLangType;
  communityPostData: PostResponseType;
  texts: CommunityPostTextType;
};
const CommunityPostTemplate = ({
  identity,
  user_idx,
  postIndex,
  lang,
  communityPostData,
  texts,
}: CommunityPostPropType) => {
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const [orderType, setOrderType] = useState<OrderType>('newest');
  const [page, setPage] = useState(0);
  const board_lang = 'ALL';
  const [commentList, setCommentList] = useState<Array<CommentResponseType>>([]);
  const [commentTotalCount, setCommentTotalCount] = useState<number>(0);
  const [selectInfo, setSelectInfo] = useState<selectInfoType>({
    purpose: null,
    target_type: null,
    idx: '',
  });

  const getCommentsQuery = ({ pageParam = 0 }) => {
    const data = getComments(postIndex, identity, board_lang, orderType, pageParam, 20);
    return data;
  };

  const { data, isSuccess, isLoading, refetch, error, fetchNextPage } = useInfiniteQuery(
    ['comments'],
    getCommentsQuery,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1;
        return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage;
      },
    }
  );

  const [modalBlock, setModalBlock] = useState(false);
  const [reportModalBlock, setReportModalBlock] = useState(false);
  const [doneModalBlock, setDoneModalBlock] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setCommentList(data.pages);
      setCommentTotalCount(data.pages[0].RESULTS.DATAS.TOTAL_CNT);
    }
  }, [isSuccess, data]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error;

  const showModalBlockOnClick = async (
    purpose: PurPoseType,
    target_type: TargetType,
    idx: string
  ) => {
    setModalBlock(true);
    setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
  };

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
    showModalBlockOnClick,
    showReportModalBlockOnClick,
  };

  const PostCommentWrapperProps: PostCommentWrapperProps = {
    getCommentParams,
    commentList,
    commentTotalCount,
    setCommentList,
    orderTypeState: { orderType, setOrderType },
    page,
    setPage,
    onCreateComment,
    refetch,
    fetchNextPage,
    showModalBlockOnClick,
    showReportModalBlockOnClick,
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
      <CommunityReportModal
        opened={reportModalBlock}
        texts={texts}
        onClose={() => {
          setReportModalBlock(false);
        }}
      />
      <CommunityBlockModal
        opened={modalBlock}
        onClose={() => {
          setModalBlock(false);
        }}
        texts={texts}
        selectInfo={selectInfo}
        identity={identity}
        setModalBlock={setModalBlock}
        setDoneModalBlock={setDoneModalBlock}
        refetch={refetch}
      />
      <CommunityDoneModal
        opened={doneModalBlock}
        onClose={() => {
          setDoneModalBlock(false);
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
