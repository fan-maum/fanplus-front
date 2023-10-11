import { BackLangType } from '@/types/common';
import { LangCookie } from '@/utils/setLangCookie';
import { useRouter } from 'next/router';

export function useUrlLanguage() {
  const router = useRouter();
  const language = router.asPath.split('/')[1];
  return language as LangCookie;
}

export function urlLangToBackLang(lang: LangCookie) {
  const translator: Record<LangCookie, BackLangType> = {
    ko: 'ko',
    en: 'en',
    ja: 'ja',
    vi: 'vi',
    es: 'es',
    in: 'id',
    'zh-CN': 'zh',
    'zh-TW': 'zhtw',
  };
  return translator[lang] || 'en';
}
