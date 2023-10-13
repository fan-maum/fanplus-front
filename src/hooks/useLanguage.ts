import type { UrlLangType, ServerLangType } from '@/types/common';
import { useRouter } from 'next/router';

export function useUrlLanguage() {
  const router = useRouter();
  const language = router.asPath.split('/')[1];
  return language as UrlLangType;
}

export function translateUrlLangToServerLang(lang: UrlLangType) {
  const translator: Record<UrlLangType, ServerLangType> = {
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
