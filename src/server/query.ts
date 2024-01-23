import { getMultiBoardsInquiry } from './../api/Community';
import { getComments, getReplies } from '@/api/Community';
import { ServerLangType } from '@/types/common';
import { useQuery } from 'react-query';

export const getRepliesQuery = async ({
  commentIndex,
  identity,
  board_lang,
  orderType,
  pageParam = 0,
  per_page,
}: any) => {
  const data = await getReplies(commentIndex, identity, board_lang, orderType, pageParam, per_page);
  return data;
};

export const getCommentsQuery = async ({
  postIndex,
  identity,
  board_lang,
  orderType,
  pageParam = 0,
  per_page,
}: any) => {
  const data = await getComments(postIndex, identity, board_lang, orderType, pageParam, per_page);
  return data;
};

/* community */
export const useGetMultiBoardsInquiryQuery = (lang: ServerLangType, boardIds?: number[]) => {
  return useQuery({
    queryKey: 'multiBoardsInquiry' + lang + boardIds?.toString(),
    queryFn: () => getMultiBoardsInquiry(lang, boardIds),
    staleTime: 1000 * 60 * 60 * 1,
    cacheTime: 1000 * 60 * 60 * 3,
  });
};
