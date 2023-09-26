import { AxiosError } from 'axios';
import { LangCookie } from './setLangCookie';

export const loginErrorHandler = (error: unknown, urlLang: LangCookie, nextUrl: string) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 406) {
      return { redirect: { destination: `/${urlLang}/login/?nextUrl=/${urlLang}${nextUrl}` } };
    }
  }
  throw error;
};

export const noUserIdHandler = (urlLang: LangCookie, nextUrl: string) => {
  return { redirect: { destination: `/${urlLang}/login/?nextUrl=/${urlLang}${nextUrl}` } };
};
