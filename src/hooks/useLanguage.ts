import type { UrlLangType, ServerLangType } from '@/types/common';
import { useRouter } from 'next/router';

export function useUrlLanguage() {
  const router = useRouter();
  const urlLang = router.query.locale;
  return urlLang as UrlLangType;
}

export function useServerLang() {
  const urlLang = useUrlLanguage();
  return translateUrlLangToServerLang(urlLang);
}

export function translateUrlLangToServerLang(urlLang: UrlLangType) {
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
  return translator[urlLang] || 'en';
}
