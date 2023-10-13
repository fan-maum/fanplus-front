import type { LangStringType } from '@/types/common';

export const postCommentCountTexts: LangStringType<(totalCount: number) => string> = {
  ko: (totalCount) => `최신댓글 ${totalCount}개`,
  en: (totalCount) => `${totalCount} comment(s)`,
  es: (totalCount) => `Comentario más reciente ${totalCount}`,
  in: (totalCount) => `${totalCount} komentar`,
  ja: (totalCount) => `${totalCount} コメント`,
  vi: (totalCount) => `${totalCount} bình luận`,
  'zh-CN': (totalCount) => `${totalCount} 条最新评论`,
  'zh-TW': (totalCount) => `${totalCount} 條最新評論`,
};
