export type LangCookie = 'ko' | 'en' | 'es' | 'in' | 'ja' | 'vi' | 'zh-CN' | 'zh-TW';

export const setLangCookie = (language: LangCookie) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  const cookieString = `USER_LANG=${language}; expires=${expirationDate.toUTCString()}; path=/;`;
  document.cookie = cookieString;
};
