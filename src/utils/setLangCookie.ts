import { BoardLangType } from '@/types/common';

export type LangCookie = 'ko' | 'en' | 'es' | 'in' | 'ja' | 'vi' | 'zh-CN' | 'zh-TW';

export const setLangCookie = (language: LangCookie) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  const domain = process.env.DOMAIN || '.localhost';
  const cookieString = `USER_LANG=${language}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

export const setBoardLangCookie = (language: BoardLangType) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  const cookieString = `boardLang=${language}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};
