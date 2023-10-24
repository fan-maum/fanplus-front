import type { UrlLangType, BoardLangType } from '@/types/common';

export const setLangCookie = (language: UrlLangType) => {
  const expireDate = setExpireDate(365);
  const cookieString = `USER_LANG=${language}; expires=${expireDate}; path=/`;
  document.cookie = cookieString;
};

export const setBoardLangCookie = (language: BoardLangType) => {
  const expireDate = setExpireDate(365);
  const cookieString = `boardLang=${language}; expires=${expireDate}; path=/`;
  document.cookie = cookieString;
};

const setExpireDate = (maintainDuration: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + maintainDuration);
  return expirationDate.toUTCString();
};
