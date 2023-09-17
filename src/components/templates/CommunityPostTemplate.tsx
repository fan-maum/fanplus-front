import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from '@emotion/styled';
import type { PostResponseType, CommentResponseType } from '@/types/community';
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
  const [orderType, setOrderType] = useState<OrderType>('newest');
  const [page, setPage] = useState(0);
  const board_lang = 'ALL';
  const [commentList, setCommentList] = useState<Array<CommentResponseType>>([]);
  const [commentTotalCount, setCommentTotalCount] = useState<number>(0);
  // const { data, isSuccess, isLoading, error, refetch } = useQuery(
  //   ['comments', { postIndex, identity, board_lang, orderType, page, per_page: 20 }],
  //   async () => {
  //     const response = await getComments(postIndex, identity, board_lang, orderType, page, 20);
  //     return response;
  //   },
  //   {
  //     keepPreviousData: true,
  //     enabled: !!{ postIndex, identity, board_lang, orderType, page, per_page: 20 }
  //   }
  // );
  const fetchTest = ({ pageParam = 0 }) => {
    const data = getComments(postIndex, identity, board_lang, orderType, pageParam, 20)
    return data;
  };

  const {
    data,
    isSuccess,
    isLoading,
    refetch,
    error,
    fetchNextPage,
  } = useInfiniteQuery(['comments'], fetchTest, {
    getNextPageParam: (currentPage) => {
      const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1
      return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage
    },
  });

  const [deleteModalBlock, setDeleteModalBlock] = useState(false);
  
  useEffect(() => {
    if (isSuccess) {
        setCommentList(data.pages);
        setCommentTotalCount(data.pages[0].RESULTS.DATAS.TOTAL_CNT);
    }
  }, [isSuccess, data]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error;
  
  const deletePostOnClick = () => { 
    setDeleteModalBlock(true); 
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

  const onCreateReply = async (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => {
    const getCommentResponse: CommentResponseType = await getComments(
      getCommentParams.target,
      getCommentParams.identity,
      board_lang,
      orderType,
      0,
      20
    );
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
    orderTypeState: { orderType, setOrderType },
    page,
    setPage,
    onCreateComment,
    refetch,
    fetchNextPage,
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
