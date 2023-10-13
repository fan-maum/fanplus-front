import type { UrlLangType, ServerAcceptLangType } from '@/types/common';
import { useRouter } from 'next/router';

export function useUrlLanguage() {
  const router = useRouter();
  const language = router.asPath.split('/')[1];
  return language as UrlLangType;
}

export function urlLangToBackLang(lang: UrlLangType) {
  const translator: Record<UrlLangType, ServerAcceptLangType> = {
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
