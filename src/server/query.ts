import { getComments, getReplies } from '@/api/Community';

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

// export const getCommentsQuery = async ({
//   postIndex,
//   identity,
//   board_lang,
//   orderType,
//   pageParam = 0,
//   per_page,
// }: any) => {
//   const data = await axios.get(`/api/com`);
//   return data;
// };

// export const getComments = async (
//   postIndex: number,
//   identity: string | null,
//   lang: BackLangType | 'ALL',
//   order_by: OrderType,
//   page: number,
//   per_page: number
// ) => {
//   const response: AxiosResponse = await axios.get(
//     `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/comment`,
//     { params: { postIndex, identity, lang, order_by, page, per_page } }
//   );
//   return response.data;
// };
