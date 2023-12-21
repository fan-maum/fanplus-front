import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';

export const setUserOnboard = async (userId: string, userIndex: string) => {
  const response: AxiosResponse<{
    RESULTS: {
      ERROR: number;
      MSG: string;
      DATAS: object;
      TIMESTAMP: number;
    };
  }> = await axios.put(`${publicEnv.CLIENT_URL}/api/userUpdate`, {
    userId,
    userIndex,
  });
  return response.data;
};
