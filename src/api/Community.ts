import axios, { AxiosResponse } from 'axios';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityHomeResponseType,
  CommunityNoticeBannerResponseType,
  EditBoardArticleResponseType,
  EditorImageUploadResponseType,
  EditorImageUrlResponseType,
  PostBoardArticleResponseType,
} from '@/types/community';

import type { BackLangType, BoardLangType, OrderType } from '@/types/common';

export const getCommunityHomeData = async (userId: string, lang: BoardLangType) => {
  const response: AxiosResponse<CommunityHomeResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/home`,
    { params: { userId, lang } }
  );
  return response.data;
};

export const getCommunityBoardData = async (
  userId: string,
  boardIndex: number,
  page: number,
  lang: BackLangType,
  boardLang: BoardLangType,
  topic: number | '',
  view_type: string
) => {
  if (topic === 0) topic = '';
  const response: AxiosResponse<CommunityBoardResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/board`,
    { params: { userId, boardIndex, page, topic, lang, boardLang, view_type } }
  );
  return response.data;
};

export const getCommunityBoardTopics = async (boardIndex: number, lang: BackLangType) => {
  const response: AxiosResponse<CommunityBoardTopicResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/boardTopic`,
    { params: { boardIndex, lang } }
  );
  return response.data;
};

/**
 * Search Board
 */
/* 검색 페이지 내 중간부분 Tab response */
export const getCommunityBoardCategoryData = async (lang: BackLangType) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardCategory`,
    { params: { lang } }
  );
  return response.data;
};

/* 검색 페이지 내 검색 결과 response */
export const getCommunityBoardResultData = async (
  category_type: number,
  searchValue: any,
  lang: BackLangType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardResult`,
    { params: { category_type, searchValue, lang, page, per_page } }
  );
  return response.data;
};

export const getCommunityNoticeBannerData = async (boardIndex: number, lang: BackLangType) => {
  const response: AxiosResponse<CommunityNoticeBannerResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/noticeBanner`,
    { params: { boardIndex, lang } }
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
  identity: string,
  lang: BackLangType
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/post`,
    { params: { boardIndex, postIndex, identity, lang } }
  );
  return response.data;
};

export const deletePost = async (identity: string, post_idx: string, mode: 'reset' | 'remove') => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/deletePost?identity=${identity}&post_idx=${post_idx}&mode=${mode}`,
    {
      data: {
        identity: identity,
        post_idx: post_idx,
        mode: mode,
      },
    }
  );
  return response;
};

export const getComments = async (
  postIndex: number,
  identity: string | null,
  lang: BackLangType | 'ALL',
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(`/api/community/comment`, {
    params: { postIndex, identity, lang, order_by, page, per_page },
  });
  return response.data;
};

export const postComment = async (
  identity: string,
  target_type: string,
  target: number,
  contents: string | number
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postComment`,
    {
      identity: identity,
      target_type: target_type,
      target: target,
      contents: contents,
    }
  );
  return response.data;
};

export const deleteComment = async (identity: string, comment_idx: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postComment?comment_idx=${comment_idx}`,
    {
      data: {
        identity: identity,
        comment_idx: comment_idx,
      },
    }
  );
  return response;
};

export const getReplies = async (
  commentIndex: number,
  identity: string | null,
  board_lang: BackLangType | 'ALL',
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(`/api/community/reply`, {
    params: { commentIndex, identity, board_lang, order_by, page, per_page },
  });
  return response.data;
};

/**
 * Likes
 */
/* 좋아요 */
export const postLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/likes/${commentIndex}`,
    {
      identity: identity,
    }
  );
  return response;
};

export const deleteLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/likes/${commentIndex}`,
    {
      data: {
        identity: identity,
      },
    }
  );
  return response;
};

/**
 * Recommend
 */
/* 추천 */
export const postRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/recommends`,
    {
      identity: identity,
      post_idx: post_idx,
    }
  );
  return response;
};

export const deleteRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/recommends?post_idx=${post_idx}`,
    {
      data: {
        identity: identity,
        post_idx: post_idx,
      },
    }
  );
  return response;
};

/**
 * Editor
 */
/* board article posting 하기 */
export const postBoardArticle = async (
  userId: string,
  boardIndex: number,
  lang: BackLangType,
  topicIndex: number,
  title: string,
  contents: string,
  attachmentIds: string[]
) => {
  const resposne: AxiosResponse<PostBoardArticleResponseType> = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postBoardArticle`,
    { userId, boardIndex, lang, topicIndex, title, contents, attachmentIds }
  );
  return resposne.data;
};

export const editBoardArticle = async (
  userId: string,
  postIndex: number,
  lang: BackLangType,
  topicIndex: number,
  title: string,
  contents: string
) => {
  const response: AxiosResponse<EditBoardArticleResponseType> = await axios.put(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editBoardArticle`,
    { userId, postIndex, lang, title, contents, topicIndex }
  );
  return response.data;
};

export const getFileUploadUrl = async () => {
  const response: AxiosResponse<EditorImageUrlResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editorFileUploadUrl`
  );
  return response.data;
};

export const uploadEditorFile = async (
  userId: string,
  fileName: string,
  fileType: string,
  uploadKey: string,
  postIndex?: number
) => {
  const response: AxiosResponse<EditorImageUploadResponseType> = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editorFileUpload`,
    { userId, fileName, fileType, uploadKey, postIndex }
  );
  return response.data;
};

/**
 * Report
 */
/* 신고 */
export const reportPost = async (
  identity: string,
  page: number,
  per_page: number,
  post_idx: string,
  mode: 'recommend' | 'report',
  report_type: number
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/reportPost?identity=${identity}&page=${page}&per_page=${per_page}`,
    {
      identity: identity,
      post_idx: post_idx,
      mode: mode,
      report_type: report_type,
    }
  );

  return response;
};

export const reportComment = async (
  identity: string,
  comment_idx: string,
  report_type: 'spam' | 'bad'
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/reportComment`,
    {
      identity: identity,
      comment_idx: comment_idx,
      report_type: report_type,
    }
  );

  return response;
};

/**
 * User
 */
/* 유저정보 */
export const getUser = async (user_idx: string, identity: string | null) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/user`,
    { params: { user_idx, identity } }
  );

  return response.data;
};
