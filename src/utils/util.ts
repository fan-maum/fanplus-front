import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { getLanguage } from '@/hooks/useLanguage';

export const formatTime = (time: number | undefined) => {
  const language = getLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];

  if (time === undefined) return undefined;
  if (time < 0) return '종료';
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const day = voteLanguage?.daysAgo;

  return `${days || ''}${days ? day : ''} ${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
