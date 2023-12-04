import type { LangStringType } from '@/types/common';
import type { VoteDetailAdBannerTextType } from '@/types/textTypes';
import type { voteDetailAdBannerTextProps } from '@/types/vote';

type VoteModalFuncType = ({
  freeVoteCount,
}: voteDetailAdBannerTextProps) => VoteDetailAdBannerTextType;

export const voteDetailAdBannerTexts: LangStringType<VoteModalFuncType> = {
  ko: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  en: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  es: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  in: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  ja: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  vi: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  'zh-CN': ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  'zh-TW': ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로</span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
};
