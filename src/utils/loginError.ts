import type { UrlLangType } from '@/types/common';
import { AxiosError } from 'axios';

export const loginErrorHandler = (error: unknown, urlLang: UrlLangType, nextUrl: string) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 406) {
      return { redirect: { destination: `/${urlLang}/login/?nextUrl=/${urlLang}${nextUrl}` } };
    }
  }
  throw error;
};

export const noUserIdHandler = (urlLang: UrlLangType, nextUrl: string) => {
  return { redirect: { destination: `/${urlLang}/login/?nextUrl=/${urlLang}${nextUrl}` } };
};
