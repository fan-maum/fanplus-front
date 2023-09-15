import axios, { AxiosResponse } from 'axios';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityHomeResponseType,
} from '@/types/community';
import type { BackLangType, TargetType, OrderType } from '@/types/common';

export const getCommunityHomeData = async (userId: string) => {
  const response: AxiosResponse<CommunityHomeResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/home`,
    { params: { userId } }
  );
  return response.data;
};

export const getCommunityBoardData = async (
  userId: string,
  boardIndex: number,
  page: number,
  lang: BackLangType,
  boardLang: BackLangType | 'ALL',
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

export const getCommunityBoardTopics = async (userId: string, boardIndex: number) => {
  const response: AxiosResponse<CommunityBoardTopicResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/boardTopic`,
    { params: { userId, boardIndex } }
  );
  return response.data;
};

/**
 * Search Board
 */
/* 검색 페이지 내 중간부분 Tab response */
export const getCommunityBoardCategoryData = async (lang: string) => {
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
  lang: string,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardResult`,
    { params: { category_type, searchValue, lang, page, per_page } }
  );
  return response.data;
};

/**
 * Post
 */
/* 게시글 불러오기 */
export const getCommunityPostData = async (postIndex: number, identity: string) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/post`,
    { params: { postIndex, identity } }
  );
  return response.data;
};

export const getCommunityUnAuthPostData = async (
  boardIndex: number,
  postIndex: number,
  lang: BackLangType
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/unAuth/post`,
    { params: { boardIndex, postIndex, lang } }
  );
  return response.data;
};

export const getComments = async (
  postIndex: number,
  identity: string | null,
  lang: BackLangType | 'ALL',
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/comment`,
    { params: { postIndex, identity, lang, order_by, page, per_page } }
  );
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
  commentIndex: string,
  identity: string,
  board_lang: BackLangType | 'ALL',
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/reply`,
    { params: { commentIndex, identity, board_lang, order_by, page, per_page } }
  );
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
