import { Cookies } from 'react-cookie';
import { Cookie, CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCommunityCookie = (name: string, value: Cookie, options: CookieSetOptions) => {
  return cookies.set(name, value, { ...options });
};

export const getCommunityCookie = (name: string) => {
  return cookies.get(name);
};
