import { Cookies } from 'react-cookie';
import { Cookie, CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setVoteCookie = (name: string, value: Cookie, options: CookieSetOptions) => {
  return cookies.set(name, value, { ...options });
};

export const getVoteCookie = (name: string) => {
  return cookies.get(name);
};
