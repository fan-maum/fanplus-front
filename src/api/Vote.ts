import type { ServerLangType } from '@/types/common';
import { VoteDetailResponse, VoteMutateParam } from '@/types/vote';
import axios, { AxiosResponse } from 'axios';
import { APIServer } from './Instance';

export const getVoteList = async (
  vote_type: string | undefined | null,
  page: number,
  per_page: number,
  lang: string
) => {
  const response: AxiosResponse = await APIServer.get(`/v2/votes/votes`, {
    params: { vote_type, page, per_page, lang },
  });
  // const response = fetch(
  //   `https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${page}&per_page=${per_page}&lang=${lang}`,
  //   {
  //     method: 'GET',
  //     headers: { Origin: origin },
  //   }
  // );
  return response.data;
};

export const getVoteDetail = async (vote_idx: string, lang: ServerLangType) => {
  const response: AxiosResponse<VoteDetailResponse> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/voteDetail`,
    { params: { vote_idx, lang } }
  );

  return response;
};

export const postVotes = async ({ voteId, userId, starId }: VoteMutateParam) => {
  const response: AxiosResponse<{
    RESULTS: {
      ERROR: number;
      MSG: string;
      DATAS: object;
      TIMESTAMP: number;
    };
  }> = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/vote`, {
    voteId,
    userId,
    starId,
  });
  return response.data;
};
