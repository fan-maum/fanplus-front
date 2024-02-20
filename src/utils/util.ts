import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { VoteDetailStars } from '@/types/vote';

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

export const pathOnly = (url: string) => {
  return url.split('?')[0];
};

/**
 * @param prevTimeExpression api 반환값 (ex: 2023-12-28 21:10:05)
 * @returns 날짜 + 시간 + (KST) (ex: 2023.12.28 21:10 (KST))
 */
export const formatWrittenTime = (prevTimeExpression: string) => {
  return prevTimeExpression.split(':', 2).join(':').replaceAll('-', '.') + ' (KST)';
};

/**
 * @param prevTimeExpression api 반환값 (ex: 2023-12-28T21:10:05.000Z)
 * @returns 오늘일 경우: 시간만 표시 (ex: 21:10 (KST))
 * @returns 오늘이 아닐 경우: 날짜만 표시 (ex: 2023.12.28)
 */
export const formatWrittenTimeLite = (prevTimeExpression: string) => {
  const today = new Date();

  // 2. UTC 시간 계산
  const utc = today.getTime() + today.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const KR_today = new Date(utc + KR_TIME_DIFF);

  const writtenTime = new Date(prevTimeExpression.split('.')[0]);
  const hours = writtenTime.getHours();
  const minutes = writtenTime.getMinutes();
  const formatHours = hours < 10 ? `0${hours}` : hours;
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const isToday = writtenTime.toDateString() === KR_today.toDateString();

  return isToday
    ? `${formatHours}:${formatMinutes} (KST)`
    : prevTimeExpression.split('T')[0].replaceAll('-', '.');
};
