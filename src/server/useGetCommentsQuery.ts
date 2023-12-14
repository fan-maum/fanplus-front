import { useInfiniteQuery, useQuery } from 'react-query';
import { getCommentsQuery, getRepliesQuery } from './query';
import { BoardLangType, OrderType } from '@/types/common';
import { getUser } from '@/api/Community';

export const useGetCommentQuery = (props: useGetCommentQueryProps) => {
  const { postIndex, identity, board_lang, orderType, per_page } = props;
  const res = useInfiniteQuery({
    queryKey: ['comments' + postIndex],
    queryFn: ({ pageParam = 0 }) =>
      getCommentsQuery({ postIndex, identity, board_lang, orderType, pageParam, per_page }),
    getNextPageParam: (currentPage) => {
      const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1;
      return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage;
    },
    enabled: postIndex !== null,
  });

  return res;
};

export const useGetReplyQuery = (props: useGetReplyQueryProps) => {
  const { commentIndex, identity, board_lang, orderType, per_page } = props;
  const res = useInfiniteQuery({
    queryKey: ['replies'],
    queryFn: ({ pageParam = 0 }) =>
      getRepliesQuery({ commentIndex, identity, board_lang, orderType, pageParam, per_page }),
    getNextPageParam: (currentPage) => {
      const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1;
      return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage;
    },
    enabled: commentIndex !== null,
  });

  return res;
};

export const useGetUserQuery = (props: useGetUserQueryProps) => {
  const { user_idx, identity } = props;
  const res = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(user_idx, identity),
  });
  return res;
};

interface useCommonCommentQueryType {
  identity: string;
  board_lang: BoardLangType | 'ALL';
  orderType: OrderType;
  per_page: number;
}

export interface useGetCommentQueryProps extends useCommonCommentQueryType {
  postIndex: number;
}

export interface useGetReplyQueryProps extends useCommonCommentQueryType {
  commentIndex: number | null;
}

export interface useGetUserQueryProps {
  user_idx: string | null;
  identity: string | null;
}
