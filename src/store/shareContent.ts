import { GetLanguage } from '@/hooks/useLanguage';
import { shareModalState } from './voteLangState';
import { useRecoilState } from 'recoil';
import { getKoreaTime } from '@/utils/util';
import { VoteDetailStars } from '@/types/vote';

export function useTitleText(voteTitle: string, starNameText: string | null) {
  const language = GetLanguage();
  const koreaTime = getKoreaTime();
  const shareModalLanguage = useRecoilState(shareModalState(language))[0];
  const modalTitleText = shareModalLanguage?.shareTitleText;

  return [
    `${voteTitle} ${modalTitleText?.title0}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle} #${starNameText} ${modalTitleText?.title1}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle} #${starNameText} ${modalTitleText?.title2}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle}`,
  ];
}

export function useMiddleText(
  star: VoteDetailStars | null,
  nextStar: VoteDetailStars | null,
  prevStar: VoteDetailStars | null,
  starNameText: string | null,
  diffNextText: string | null,
  rankText: string | null,
  diffPrevText: string | null
) {
  const language = GetLanguage();
  const shareModalLanguage = useRecoilState(shareModalState(language))[0];
  const modalMiddleText = shareModalLanguage?.shareMiddleText;
  const middleTextStandard = [
    `${modalMiddleText?.first} ${star?.STAR_GROUP_NAME} #${starNameText} 🏆\n${modalMiddleText?.second} ${nextStar?.STAR_NAME}\n\n${modalMiddleText?.voteDiffFront} ${diffNextText}${modalMiddleText?.voteDiffBack} 👀`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${modalMiddleText?.voteDiff}${prevStar?.RANK}${modalMiddleText?.place} ${prevStar?.STAR_NAME}${modalMiddleText?.with} ${diffPrevText}${modalMiddleText?.voteDiffBack}\n${modalMiddleText?.voteDiff}${nextStar?.RANK}${modalMiddleText?.place} ${nextStar?.STAR_NAME}${modalMiddleText?.with} ${diffNextText}${modalMiddleText?.voteDiffBack}`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${modalMiddleText?.voteDiff}${prevStar?.RANK}${modalMiddleText?.place} ${prevStar?.STAR_NAME}${modalMiddleText?.with} ${diffPrevText}${modalMiddleText?.voteDiffBack}`,
    `${modalMiddleText?.middlePageFront}\n\n${modalMiddleText?.middlePageBack}`,
  ];
  const middleTextMulti = [
    `${modalMiddleText?.first} ${star?.STAR_GROUP_NAME} #${starNameText} 🏆\n${modalMiddleText?.second} ${nextStar?.STAR_NAME}\n\n${modalMiddleText?.voteDiffFront} ${diffNextText}${modalMiddleText?.voteDiffBack} 👀`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${diffPrevText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.lessThan} ${prevStar?.RANK} ${prevStar?.STAR_NAME}\n$${diffNextText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.moreThan} ${nextStar?.RANK} ${nextStar?.STAR_NAME}`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${diffPrevText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.lessThan} ${prevStar?.RANK} ${prevStar?.STAR_NAME}`,
    `${modalMiddleText?.middlePageFront}\n\n${modalMiddleText?.middlePageBack}`,
  ];

  const standardLanguage = language === 'ko' || language === 'zh-rCN' || language === 'zh-rTW';
  return standardLanguage ? middleTextStandard : middleTextMulti;
}

export function useEndText(starNameText: string | null) {
  const language = GetLanguage();
  const shareModalLanguage = useRecoilState(shareModalState(language))[0];
  const modalEndText = shareModalLanguage?.shareEndText;

  return [
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endPage}`,
  ];
}
