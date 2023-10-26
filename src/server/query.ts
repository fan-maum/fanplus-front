import { getComments, getReplies } from '@/api/Community';

export const getRepliesQuery = async ({ commentIndex, identity, board_lang, orderType }: any) => {
  const data = await getReplies(commentIndex, identity, board_lang, orderType);
  return data;
};

export const getCommentsQuery = async ({
  postIndex,
  identity,
  board_lang,
  orderType,
  pageParam = 0,
}: any) => {
  const data = await getComments(postIndex, identity, board_lang, orderType, pageParam);
  return data;
};
