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

export const getCommunityPostCommentData = async (
  target_type: TargetType,
  target: number,
  order_by: OrderType,
  lang: BackLangType, // system
  page: number,
  identity: string,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/comment`,
    { params: { target_type, target, order_by, lang, page, identity, per_page } }
  );
  return response.data;
};

export const getCommunityUnAuthPostCommentData = async (
  target_type: TargetType,
  target: number,
  order_by: OrderType,
  board_lang: BackLangType | 'ALL', // filterLang
  lang: BackLangType, // system
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/unAuth/comment`,
    { params: { target_type, target, order_by, board_lang, lang, page, per_page } }
  );
  return response.data;
};

export const postCommentResult = async (
  userId: string,
  target_type: string,
  target: string,
  contents: string | number
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postComment`,
    {
      identity: userId,
      target_type: target_type,
      target: target,
      contents: contents,
    }
  );
  return response;
};

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
