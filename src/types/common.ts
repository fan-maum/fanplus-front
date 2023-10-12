export type UrlLangType = 'ko' | 'en' | 'es' | 'in' | 'ja' | 'vi' | 'zh-CN' | 'zh-TW';
export type BackLangType = 'ko' | 'en' | 'ja' | 'es' | 'vi' | 'id' | 'zh' | 'zhtw';
export type BoardLangType = BackLangType | 'ALL';
export type LangStringType<T> = Record<UrlLangType, T>;

export type TargetType =
  | 'photo'
  | 'fanfic_episode'
  | 'comment'
  | 'vote'
  | 'user_collection'
  | 'post';
export type OrderType = 'oldest' | 'newest';
export type PurPoseType = 'delete' | 'edit' | 'report';
export type selectInfoType = {
  purpose: PurPoseType | null;
  target_type: TargetType | null;
  idx: string;
};
