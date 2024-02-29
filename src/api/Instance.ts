import axios, { AxiosError, AxiosResponse } from 'axios';

export const APIServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_CLIENT_URL,
    'Access-Control-Allow-Credentials': 'true',
    'Cache-Control': 'no-cache',
  },
});

// TODO: 통합 에러 핸들링.. 추후
const handleResponse = (response: AxiosResponse) => {
  return response;
};

const handleError = (error: AxiosError) => {
  // eslint-disable-next-line no-console
  console.error(error.response?.data);
  throw error;
};

APIServer.interceptors.response.use(handleResponse, handleError);
