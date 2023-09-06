import axios, { AxiosResponse } from 'axios';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityHomeResponseType,
} from '@/types/community';
import type { BackLangType } from '@/types/common';

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
export const getCommunityBoardCategoryData = async (userId: string) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardCategory`,
    { params: { userId } }
  );
  return response.data;
};

/* 검색 페이지 내 검색 결과 response */
export const getCommunityBoardResultData = async (
  userId: string,
  category_type: number,
  searchValue: any,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardResult`,
    { params: { userId, category_type, searchValue, page, per_page } }
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
  lang: BackLangType
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/post`,
    { params: { boardIndex, postIndex, lang } }
  );
  return response.data;
};
