import type { BoardLangType, OrderType, ServerLangType } from '@/types/common';
import type {
  CommentResponseType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResponseType,
  CommunityBoardResultResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
  EditBoardArticleResponseType,
  EditorImageUploadResponseType,
  EditorImageUrlResponseType,
  PostBoardArticleResponseType,
  PostResponseType,
  RecentlyListResponseType,
  RecommendListResponseType,
  replyResponseType,
} from '@/types/community';
import type { AxiosResponse } from 'axios';
import { APIServer } from './Instance';

export const getCommunityHomeData = async (identity: string | null, lang: ServerLangType) => {
  const recommendListResponse: AxiosResponse<RecommendListResponseType> = await APIServer.get(
    `/voteWeb/boards2/recommend`,
    { params: identity ? { identity, lang } : { lang } }
  );
  const recentlyListResponse: AxiosResponse<RecentlyListResponseType> = await APIServer.get(
    `/voteWeb/boards2/recently`,
    { params: identity ? { identity, lang } : { lang } }
  );
  const recommendList = recommendListResponse.data.RESULTS.DATAS.RECOMMEND_LIST;
  const recentlyList = recentlyListResponse.data.RESULTS.DATAS.RECENTLY_LIST;
  return { recommendList, recentlyList };
};

export const getCommunityBoardData = async (
  userId: string | null,
  boardIndex: number,
  page: number,
  lang: ServerLangType,
  filter_lang: BoardLangType,
  topic: number | '',
  view_type: string
) => {
  if (topic === 0) topic = '';
  const queries = { page, per_page: 20, lang, filter_lang, view_type, 'topic_ids[]': topic };
  const queriesWithUserId = { ...queries, userId };
  const response: AxiosResponse<CommunityBoardResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/posts`,
    { params: userId ? queriesWithUserId : queries }
  );
  return response.data;
};

export const getCommunityBoardTopics = async (boardIndex: number, lang: ServerLangType) => {
  const response: AxiosResponse<CommunityBoardTopicResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/topics`,
    { params: { lang } }
  );
  return response.data;
};

/**
 * Search Board
 */
/* 검색 페이지 내 중간부분 Tab response */
export const getCommunityBoardCategoryData = async (lang: ServerLangType) => {
  const response: AxiosResponse<CommunityBoardCategoryResponseType> = await APIServer.get(
    `/voteWeb/search/category`,
    { params: { lang } }
  );
  return response.data;
};

/* 검색 페이지 내 검색 결과 response */
export const getCommunityBoardResultData = async (
  category_type: number,
  searchValue: any,
  lang: ServerLangType,
  page: number
) => {
  const response: AxiosResponse<CommunityBoardResultResponseType> = await APIServer.get(
    '/voteWeb/search/board',
    { params: { category_type, search_val: searchValue, lang, page, per_page: 20 } }
  );
  return response.data;
};

export const getCommunityNoticeBannerData = async (boardIndex: number, lang: ServerLangType) => {
  const response: AxiosResponse<CommunityNoticeBannerResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/banners`,
    { params: { lang } }
  );
  return response.data;
};

/**
 * Post
 */
/* 게시글 불러오기 */
export const getCommunityPostData = async (
  boardIndex: number,
  postIndex: number,
  identity: string | null,
  lang: ServerLangType
) => {
  const response: AxiosResponse<PostResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail`,
    { params: identity ? { identity, lang } : { lang } }
  );
  return response.data;
};

export const deletePost = async (identity: string, post_idx: string, mode: 'reset' | 'remove') => {
  const response: AxiosResponse = await APIServer.delete(`/v1/boards/posts`, {
    data: { identity, post_idx, mode },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getComments = async (
  postIndex: number,
  identity: string | null,
  lang: BoardLangType,
  order_by: OrderType,
  page: number
) => {
  const per_page = 20;
  const queries = { lang, order_by, page, per_page };
  const queriesWithUserId = { ...queries, identity };

  const response: AxiosResponse<CommentResponseType> = await APIServer.get(
    `/voteWeb/posts/${postIndex}/comments`,
    { params: identity ? queriesWithUserId : queries }
  );
  return response.data;
};

export const postComment = async (
  identity: string,
  target_type: string,
  target: number,
  contents: string | number
) => {
  const response: AxiosResponse = await APIServer.post(
    `/v1/comments`,
    { identity, target_type, target, contents },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

export const deleteComment = async (identity: string, comment_idx: string) => {
  const response: AxiosResponse = await APIServer.delete(`/v1/comments`, {
    data: { identity, comment_idx },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getReplies = async (
  commentIndex: number,
  identity: string | null,
  board_lang: BoardLangType,
  order_by: OrderType
) => {
  const queries = { lang: board_lang, order_by, page: 0, per_page: 20 };
  const queriesWithUserId = { ...queries, identity };

  const response: AxiosResponse<replyResponseType> = await APIServer.get(
    `/voteWeb/comments/${commentIndex}/subComments`,
    { params: identity ? queriesWithUserId : queries }
  );
  return response.data;
};

/**
 * Likes
 */
/* 좋아요 */
export const postLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await APIServer.post(
    `/v1/likes/comment/${commentIndex}`,
    { identity },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

export const deleteLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await APIServer.delete(`/v1/likes/comment/${commentIndex}`, {
    data: { identity },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Recommend
 */
/* 추천 */
export const postRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await APIServer.post(
    '/v1/recommends/posts',
    { identity, post_idx },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

export const deleteRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await APIServer.delete('/v1/recommends/posts', {
    data: { identity, post_idx },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Editor
 */
/* board article posting 하기 */
export const postBoardArticle = async (
  identity: string,
  boardIndex: number,
  lang: ServerLangType,
  topic_idx: number,
  title: string,
  contents: string,
  attachmentIds: string[]
) => {
  const baseBodyData = { identity, lang, app_lang: lang, topic_idx, title, contents };
  const isAttatchments = attachmentIds.length !== 0;
  const finalBodyData = isAttatchments
    ? { ...baseBodyData, attachment_ids: attachmentIds.toString() }
    : baseBodyData;

  const resposne: AxiosResponse<PostBoardArticleResponseType> = await APIServer.post(
    `/voteWeb/boards/${boardIndex}/posts/0`,
    finalBodyData,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return resposne.data;
};

export const editBoardArticle = async (
  identity: string,
  post_idx: number,
  lang: ServerLangType,
  topic_idx: number,
  title: string,
  contents: string
) => {
  const response: AxiosResponse<EditBoardArticleResponseType> = await APIServer.put(
    '/v2/boards/posts',
    { identity, post_idx, lang, app_lang: lang, title, contents, topic_idx, is_publish: 'Y' },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data;
};

export const getFileUploadUrl = async () => {
  const response: AxiosResponse<EditorImageUrlResponseType> = await APIServer.get('/voteWeb/imgs');
  return response.data;
};

export const uploadEditorFile = async (
  identity: string,
  fileName: string,
  fileType: string,
  upload_key: string,
  postIndex?: number
) => {
  const response: AxiosResponse<EditorImageUploadResponseType> = await APIServer.post(
    '/voteWeb/imgs',
    { identity, origin_name: fileName, file_ext: fileType, upload_key, post_idx: postIndex || 0 },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

/**
 * Report
 */
/* 신고 */
export const reportPost = async (
  identity: string,
  post_idx: string,
  mode: 'recommend' | 'report',
  report_type: number
) => {
  const response: AxiosResponse = await APIServer.post(
    '/v1/reports/posts',
    { identity, post_idx, mode, report_type },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

export const reportComment = async (
  identity: string,
  comment_idx: string,
  report_type: 'spam' | 'bad'
) => {
  const response: AxiosResponse = await APIServer.post(
    '/v1/reports/comments',
    { identity, comment_idx, report_type },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

/**
 * User
 */
/* 유저정보 */
export const getUser = async (user_idx: string, identity: string | null) => {
  const response: AxiosResponse = await APIServer.get(`/v1/users/${user_idx}`, {
    params: { identity },
  });

  return response.data;
};
