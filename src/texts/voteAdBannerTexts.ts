import type { LangStringType } from '@/types/common';
import type { VoteDetailAdBannerTextType } from '@/types/textTypes';
import type { voteDetailAdBannerTextProps } from '@/types/vote';

type VoteModalFuncType = ({
  dailyTicketCount,
}: voteDetailAdBannerTextProps) => VoteDetailAdBannerTextType;

export const voteAdBannerTexts: LangStringType<VoteModalFuncType> = {
  ko: ({ dailyTicketCount }) => {
    return {
      message1: `아래 후보 중 내 최애에게 <span>매일 ${dailyTicketCount}표씩 무료로 </span>`,
      message2: `투표하고 광고 선물하세요!`,
    };
  },
  en: ({ dailyTicketCount }) => {
    return {
      message1: `<span>Use ${dailyTicketCount} free VTs to vote for </span>`,
      message2: `your favorite star to get AD rewards!`,
    };
  },
  es: ({ dailyTicketCount }) => {
    return {
      message1: `<span>¡Usa ${dailyTicketCount} VT gratis </span>`,
      message2: `para votar por tu estrella favorita!`,
    };
  },
  in: ({ dailyTicketCount }) => {
    return {
      message1: `<span>Gunakan ${dailyTicketCount} VT gratis </span>`,
      message2: `untuk memilih bintang favoritmu!`,
    };
  },
  ja: ({ dailyTicketCount }) => {
    return {
      message1: `<span>${dailyTicketCount}個の無料VTを使用してお気に, </span>`,
      message2: `入りのスターに投票し、広告報酬を獲得しましょう！`,
    };
  },
  vi: ({ dailyTicketCount }) => {
    return {
      message1: `<span>Sử dụng ${dailyTicketCount} VT miễn </span>`,
      message2: `phí để bầu cho ngôi sao yêu thích của bạn!`,
    };
  },
  'zh-CN': ({ dailyTicketCount }) => {
    return {
      message1: `<span>使用每日免费赠送的${dailyTicketCount}票， </span>`,
      message2: `给最爱的偶像投票并给予明星广告礼物！`,
    };
  },
  'zh-TW': ({ dailyTicketCount }) => {
    return {
      message1: `<span>使用每日免費贈送的${dailyTicketCount}票， </span>`,
      message2: `給最愛的偶像投票並給予明星廣告禮物`,
    };
  },
};
