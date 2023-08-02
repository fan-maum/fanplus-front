import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';

export const FormatTime = (time: number | undefined) => {
  const language = GetLanguage();
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
