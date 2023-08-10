export type LangCookie = 'ko' | 'en' | 'es' | 'in' | 'ja' | 'vi' | 'zh-CN' | 'zh-TW';

export const setLangCookie = (language: LangCookie) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  const domain = process.env.COOKIE_DOMAIN || '.localhost';
  const cookieString = `USER_LANG=${language}; expires=${expirationDate.toUTCString()}; path=/; domain=${domain};`;
  document.cookie = cookieString;
};
