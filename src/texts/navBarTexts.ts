import type { NavBarTextType } from '@/types/textTypes';

export type SupportLanguage = 'ko' | 'en' | 'es' | 'in' | 'ja' | 'vi' | 'zh-CN' | 'zh-TW';
export type LanguageType<T> = Record<SupportLanguage, T>;
