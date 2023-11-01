import type { ServerLangType } from '@/types/common';
import type { VoteDetailResponse, VoteMutateParam } from '@/types/vote';
import type { AxiosResponse } from 'axios';
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
  return response.data;
};

export const getVoteDetail = async (vote_idx: number, lang: ServerLangType) => {
  const response: AxiosResponse<VoteDetailResponse> = await APIServer.get(`/voteWeb/${vote_idx}`, {
    params: { lang },
  });
  return response.data;
};

export const postVotes = async ({ voteId, userId, starId }: VoteMutateParam) => {
  const response: AxiosResponse = await APIServer.post(
    `/voteWeb/${voteId}`,
    { identity: userId, target_star_idx: starId },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data;
};
