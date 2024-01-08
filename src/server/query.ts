import {
  getBookmarks,
  getComments,
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getReplies,
} from '@/api/Community';
import { ServerLangType, UrlLangType } from '@/types/common';
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
export const useGetMainMenuCategoryQuery = (serverLang: ServerLangType) => {
  return useQuery({
    queryKey: 'communityMainMenuCateogory' + serverLang,
    queryFn: () => getCommunityBoardResultData(5, '', serverLang, 0, 20),
  });
};

export const useGetBookmarksQuery = (props: useGetBookmarksQueryProps) => {
  const { identity, lang } = props;
  const res = useQuery({
    queryKey: [`bookmarks${identity}${lang}`],
    queryFn: () => getBookmarks(identity, lang),
  });
  return res;
};

export interface useGetBookmarksQueryProps {
  identity: string;
  lang: UrlLangType;
}
