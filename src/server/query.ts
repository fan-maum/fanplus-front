import { getComments, getReplies } from '@/api/Community';

export const getRepliesQuery = async ({ commentIndex, identity, pageParam = 0 }: any) => {
  const board_lang = 'ALL';
  const order_by = 'newest';
  const data = await getReplies(commentIndex, identity, board_lang, order_by, pageParam, 20);
  return data;
};

export const getCommentsQuery = async ({
  postIndex,
  identity,
  board_lang,
  orderType,
  pageParam = 0,
}: any) => {
  const data = await getComments(postIndex, identity, board_lang, orderType, pageParam, 20);
  return data;
};
