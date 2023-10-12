import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import type { UrlLangType } from './types/common';

const PUBLIC_FILE = /\.(.*)$/;
export const AVAIL_PAGE = [
  'business',
  'community',
  'faq',
  '',
  'login',
  'signUp',
  'voteDetail',
  'votes',
];
export const SUPPORT_LANGUAGE: UrlLangType[] = [
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
    headers: { 'accept-language': request.headers.get('accept-language') as string },
  });

  const userLang =
    request.cookies.get('USER_LANG')?.value || negotiator.language(SUPPORT_LANGUAGE) || 'en';

  const urlPaths = request.nextUrl.pathname.substring(1); // * base 주소 다음에 오는 슬래쉬 (/) 제거
  const urlFirstPath = urlPaths.split('/')[0];
  const urlQueries = request.nextUrl.search;

  // * url에 locale 값이 존재하고 쿠키와 (혹은 browser의 locale과) 일치할 경우: 그대로 반환.
  if (urlFirstPath === userLang) return NextResponse.next();

  // * url에 locale 값이 존재하지만 쿠키와 (혹은 browser의 locale과) 일치하지 않을 경우: lang 값만 바꿔서 redirect.
  if (SUPPORT_LANGUAGE.includes(urlFirstPath as UrlLangType)) {
    const path = urlPaths.split('/');
    const newPath = [userLang, ...path.slice(1)].join('/');
    return NextResponse.redirect(new URL(`/${newPath}/${urlQueries}`, request.url));
  }

  // * url에 locale 정보는 없지만 올바른 page path를 갖고 있는 경우: 쿠키 혹은 browser의 locale 값을 붙여서 redirect.
  if (AVAIL_PAGE.includes(urlFirstPath)) {
    return NextResponse.redirect(new URL(`/${userLang}/${urlPaths}/${urlQueries}`, request.url));
  }

  // * 올바르지 않은 page path를 가지는 경우: 예전 웹사이트로 rewrite 시킴.
  return NextResponse.rewrite(`https://old.fanplus.co.kr/${urlPaths}`);
}
