import axios, { AxiosResponse } from 'axios';
import type { CommunityHomeResponseType } from '@/types/community';
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
  topic: number | ''
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/board`,
    { params: { userId, boardIndex, page, topic, lang, boardLang } }
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
