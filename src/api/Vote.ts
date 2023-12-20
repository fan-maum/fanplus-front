import type { ServerLangType } from '@/types/common';
import { VoteDetailResponse, VoteMutateParam } from '@/types/vote';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';

const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

export const getVotes = (
  vote_type: string | undefined | null,
  page: number,
  per_page: number,
  lang: string
) => {
  const response = fetch(
    `https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${page}&per_page=${per_page}&lang=${lang}`,
    {
      method: 'GET',
      headers: { Origin: origin },
    }
  );
  return response;
};

export const getVoteDetail = async (vote_idx: string, lang: ServerLangType) => {
  const response: AxiosResponse<VoteDetailResponse> = await axios.get(
    `${publicEnv.CLIENT_URL}/api/voteDetail`,
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
  }> = await axios.post(`${publicEnv.CLIENT_URL}/api/vote`, {
    voteId,
    userId,
    starId,
  });
  return response.data;
};
