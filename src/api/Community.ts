import axios, { AxiosResponse } from 'axios';
import type { CommunityHomeResponseType } from '@/pages/api/community/home';

export const getCommunityHomeData = async (userId: string) => {
  const response: AxiosResponse<CommunityHomeResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/home`,
    { params: { userId } }
  );
  return response.data;
};
