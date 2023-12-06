import type { LangStringType } from '@/types/common';
import type { VoteDetailAdBannerTextType } from '@/types/textTypes';
import type { voteDetailAdBannerTextProps } from '@/types/vote';

type VoteModalFuncType = ({
  freeVoteCount,
}: voteDetailAdBannerTextProps) => VoteDetailAdBannerTextType;

export const voteAdBannerTexts: LangStringType<VoteModalFuncType> = {
  ko: ({ freeVoteCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로 </span>투표하고 광고 선물하세요!`,
      message2: `아래 후보 중 내 최애에게 <span>매일 ${freeVoteCount}표씩 무료로 </span><br/>투표하고 광고 선물하세요!`,
    };
  },
  en: ({ freeVoteCount }) => {
    return {
      message1: `<span>Use ${freeVoteCount} free VTs to vote for </span>your favorite star to get AD rewards!`,
      message2: `<span>Use ${freeVoteCount} free VTs to vote for </span><br/>your favorite star to get AD rewards!`,
    };
  },
  es: ({ freeVoteCount }) => {
    return {
      message1: `<span>¡Usa ${freeVoteCount} VT gratis </span>para votar por tu estrella favorita!`,
      message2: `<span>¡Usa ${freeVoteCount} VT gratis </span><br/>para votar por tu estrella favorita!`,
    };
  },
  in: ({ freeVoteCount }) => {
    return {
      message1: `<span>Gunakan ${freeVoteCount} VT gratis </span>untuk memilih bintang favoritmu!`,
      message2: `<span>Gunakan ${freeVoteCount} VT gratis </span><br/>untuk memilih bintang favoritmu!`,
    };
  },
  ja: ({ freeVoteCount }) => {
    return {
      message1: `<span>${freeVoteCount}個の無料VTを使用してお気に, </span>入りのスターに投票し、広告報酬を獲得しましょう！`,
      message2: `<span>${freeVoteCount}個の無料VTを使用してお気に, </span><br/>入りのスターに投票し、広告報酬を獲得しましょう！`,
    };
  },
  vi: ({ freeVoteCount }) => {
    return {
      message1: `<span>Sử dụng ${freeVoteCount} VT miễn </span>phí để bầu cho ngôi sao yêu thích của bạn!`,
      message2: `<span>Sử dụng ${freeVoteCount} VT miễn </span><br/>phí để bầu cho ngôi sao yêu thích của bạn!`,
    };
  },
  'zh-CN': ({ freeVoteCount }) => {
    return {
      message1: `<span>使用每日免费赠送的${freeVoteCount}票， </span>给最爱的偶像投票并给予明星广告礼物！`,
      message2: `<span>使用每日免费赠送的${freeVoteCount}票， </span><br/>给最爱的偶像投票并给予明星广告礼物！`,
    };
  },
  'zh-TW': ({ freeVoteCount }) => {
    return {
      message1: `<span>使用每日免費贈送的${freeVoteCount}票， </span>給最愛的偶像投票並給予明星廣告禮物`,
      message2: `<span>使用每日免費贈送的${freeVoteCount}票， </span><br/>給最愛的偶像投票並給予明星廣告禮物`,
    };
  },
};
