import { useInfiniteQuery } from 'react-query';
import { getCommentsQuery, getRepliesQuery } from './query';

export const useGetReplyQuery = (commentIndex: any, identity: any) => {
  const res = useInfiniteQuery(
    ['replies', { commentIndex, identity }],
    () => getRepliesQuery({ commentIndex, identity }),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1;
        return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage;
      },
      enabled: commentIndex !== null,
    }
  );

  return res;
};

export const useGetCommentQuery = (props: any) => {
  const { postIndex, identity, board_lang, orderType } = props;
  const res = useInfiniteQuery(
    ['comments', { postIndex, identity, board_lang, orderType }],
    () => getCommentsQuery({ postIndex, identity, board_lang, orderType }),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = Number(currentPage.RESULTS.DATAS.PAGE) + 1;
        return nextPage * 20 > currentPage.RESULTS.DATAS.TOTAL_CNT ? null : nextPage;
      },
      enabled: postIndex !== null,
    }
  );

  return res;
};
