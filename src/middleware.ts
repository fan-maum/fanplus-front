import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { LangCookie } from './utils/setLangCookie';
import Negotiator from 'negotiator';

const PUBLIC_FILE = /\.(.*)$/;
export const AVAIL_PAGE = ['', 'votes', 'community', 'business', 'faq', 'login', 'signUp'];
export const SUPPORT_LANGUAGE: LangCookie[] = [
  'ko',
  'en',
  'es',
  'in',
  'ja',
  'vi',
  'zh-CN',
  'zh-TW',
];

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const negotiator = new Negotiator({
    headers: {
      'accept-language': request.headers.get('accept-language') as string,
    },
  });
  const userLang =
    request.cookies.get('USER_LANG')?.value ||
    (negotiator.language(SUPPORT_LANGUAGE) as string) ||
    'en';
  const urlPath = request.nextUrl.pathname.substring(1); // base 주소 다음에 오는 슬래쉬 (/) 제거
  const urlQueries = request.nextUrl.search;
  const redirectUrl = urlHandler(userLang, urlPath, urlQueries);

  // Escape Condition: url의 locale과 쿠키 (혹은 browser의 locale)이 일치할 경우
  if (urlPath.startsWith(userLang)) return NextResponse.next();
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

const urlHandler = (userLang: string, urlPath: string, urlQueries: string) => {
  // locale 정보가 없는 url이 입력되었을 경우: cookie (혹은 locale)값에 따라 redirect
  if (AVAIL_PAGE.includes(urlPath.split('/')[0])) {
    return `/${userLang}/${urlPath}${urlQueries}`;
  }
  // locale 정보가 있는 url이 입력되었을 경우: 그래도 cookie (혹은 locale)값을 따라가도록
  const path = urlPath.split('/');
  const newPath = [userLang, ...path.slice(1)].join('/');
  return `/${newPath}${urlQueries}`;
};
