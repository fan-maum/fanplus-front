import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { VoteDetailStars } from '@/types/vote';
import { LangCookie } from './setLangCookie';
import { BackLangType } from '@/types/common';

export const FormatTime = (time: number | undefined) => {
  const language = useUrlLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];

  if (time === undefined) return undefined;
  if (time < 0) return '종료';
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const day = voteLanguage?.daysAgo;
  const hour = voteLanguage?.hoursAgo;
  const minute = voteLanguage?.minutesAgo;
  const formatDays = days < 10 ? `0${days}` : days;

  return `${formatDays || ''}${days ? day : ''} ${hours < 10 ? '0' : ''}${hours}${hour} ${
    minutes < 10 ? '0' : ''
  }${minutes}${minute}`;
};

export const FormatShareTime = (time: number | undefined) => {
  if (time === undefined) return undefined;
  if (time < 0) return '종료';

  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);

  return `${String(days).padStart(2, '0')}일 ${String(hours).padStart(2, '0')}시간 ${String(
    minutes
  ).padStart(2, '0')}분`;
};

export function formatNumberWithComma(num: number | undefined): string {
  if (num === undefined) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getKoreaTime = () => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  return new Date(utcNow + koreaTimeDiff);
};

export const getIndexByVotes = (star: VoteDetailStars | null) => {
  if (star?.RANK === '1') return 0;
  else if (star?.RANK === undefined) return 3;
  else if (star?.RANK === '100') return 2;
  else return 1;
};

export type timeType = 'Full' | 'Date' | 'Hour' | 'Minute';
export const formatWrittenTime = (prevTimeExpression: string) => {
  const writtenTime = new Date(prevTimeExpression.replace(' ', 'T'));
  const today = new Date();
  const today00am = new Date();
  today00am.setHours(0, 0, 0, 0);

  const elapsedTimeInDate = Math.ceil(
    (today00am.getTime() - writtenTime.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (elapsedTimeInDate > 6) return { timeType: 'Full' as timeType, time: prevTimeExpression };
  if (elapsedTimeInDate > 0) return { timeType: 'Date' as timeType, time: elapsedTimeInDate };

  const elapsedTimeInSecond = Math.floor((today.getTime() - writtenTime.getTime()) / 1000);
  const elpasedTimeInMinute = Math.floor(elapsedTimeInSecond / 60);
  const elpasedTimeInHour = Math.floor(elpasedTimeInMinute / 60);

  if (elpasedTimeInHour > 0) return { timeType: 'Hour' as timeType, time: elpasedTimeInHour };
  return { timeType: 'Minute' as timeType, time: elpasedTimeInMinute };
};

export const pathOnly = (url: string) => {
  return url.split('?')[0];
};
