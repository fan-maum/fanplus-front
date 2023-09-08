import axios, { AxiosResponse } from 'axios';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityHomeResponseType,
  CommunityNoticeBannerResponseType,
} from '@/types/community';
import type { BackLangType, BoardLangType } from '@/types/common';

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

export const getCommunityBoardCategoryData = async (userId: string) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardCategory`,
    { params: { userId } }
  );
  return response.data;
};

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

export const getCommunityNoticeBannerData = async (boardIndex: number, lang: BackLangType) => {
  const response: AxiosResponse<CommunityNoticeBannerResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/noticeBanner`,
    { params: { boardIndex, lang } }
  );
  return response.data;
};
