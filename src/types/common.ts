export type UrlLangType = 'ko' | 'en' | 'es' | 'ja' | 'vi' | 'in' | 'zh-CN' | 'zh-TW';
export type ServerAcceptLangType = 'ko' | 'en' | 'es' | 'ja' | 'vi' | 'id' | 'zh' | 'zhtw';
export type BoardLangType = ServerAcceptLangType | 'ALL';
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
