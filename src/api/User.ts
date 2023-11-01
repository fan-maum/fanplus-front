import type { AxiosResponse } from 'axios';
import { APIServer } from './Instance';

export const setUserOnboard = async (identity: string, userIndex: string) => {
  const response: AxiosResponse = await APIServer.put(
    `/v1/users/${userIndex}`,
    { identity, target: 'onboarding_finished_yn', value: 'Y' },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};
