import { Cookies } from 'react-cookie';
import { Cookie, CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: Cookie, options: CookieSetOptions | undefined) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const deleteCookie = (name: string, options?: CookieSetOptions) => {
  return cookies.remove(name, { path: '/', ...options });
};
