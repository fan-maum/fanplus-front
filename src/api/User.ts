import axios, { AxiosResponse } from 'axios';

export const setUserOnboard = async (userId: string, userIndex: string) => {
  const response: AxiosResponse<{
    RESULTS: {
      ERROR: number;
      MSG: string;
      DATAS: object;
      TIMESTAMP: number;
    };
  }> = await axios.put(`${process.env.NEXT_PUBLIC_API_VOTE_URL}/api/userUpdate`, {
    userId,
    userIndex,
  });
  return response.data;
};
