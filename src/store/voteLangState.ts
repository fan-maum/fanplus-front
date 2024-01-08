import { postCommentCountTexts } from '@/texts/postCommentCountTexts';
import { shareModalTexts } from '@/texts/shareModalTexts';
import { voteDetailPageTexts } from '@/texts/voteDetailPageTexts';
import { voteModalButtonTexts } from '@/texts/voteModalButtonTexts';
import { voteModalTexts } from '@/texts/voteModalTexts';
import { votesPageTexts } from '@/texts/votesPageTexts';
import { voteDetailAdBannerTexts } from '@/texts/voteDetailAdBannerTexts';
import type { UrlLangType } from '@/types/common';
import { atomFamily } from 'recoil';
import { voteAdBannerTexts } from '@/texts/voteAdBannerTexts';

const randomNumber = Math.floor(Math.random() * 100);

export const voteLangState = atomFamily({
  key: `voteLangState/${randomNumber}`,
  default: (lang: UrlLangType) => votesPageTexts[lang],
});

export const voteDetailLangState = atomFamily({
  key: `voteDetailLangState/${randomNumber}`,
  default: (lang: UrlLangType) => voteDetailPageTexts[lang],
});

export const voteDetailAdBannerState = atomFamily({
  key: `voteDetailAdBannerState/${randomNumber}`,
  default: (lang: UrlLangType) => voteDetailAdBannerTexts[lang],
});

export const voteAdBannerState = atomFamily({
  key: `voteAdBannerState/${randomNumber}`,
  default: (lang: UrlLangType) => voteAdBannerTexts[lang],
});

export const shareModalState = atomFamily({
  key: `shareModalState/${randomNumber}`,
  default: (lang: UrlLangType) => shareModalTexts[lang],
});

export const voteModalState = atomFamily({
  key: `voteModalState/${randomNumber}`,
  default: (lang: UrlLangType) => voteModalTexts[lang],
});

export const voteModalButtonState = atomFamily({
  key: `voteModalButtonState/${randomNumber}`,
  default: (lang: UrlLangType) => voteModalButtonTexts[lang],
});

export const commentTotalCountState = atomFamily({
  key: `commentTotalCountState/${randomNumber}`,
  default: (lang: UrlLangType) => postCommentCountTexts[lang],
});
