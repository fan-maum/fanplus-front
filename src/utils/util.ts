import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { VoteDetailStars } from '@/types/vote';
import { DateTime } from 'luxon';

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
 * @returns KSTtoUTC: KST -> UTC 값으로 변경
 * @returns UTCtoKST: UTC -> KST 값으로 재변경
 */
export const formatWrittenTimeLite = (prevTimeExpression: string) => {
  const today = DateTime.now().setZone('Asia/Seoul').toFormat('yyyy.LL.dd');
  const serverDate = DateTime.fromISO(prevTimeExpression).minus({ hours: 9 }).toISO() as string;
  const UTC = DateTime.fromISO(serverDate).toUTC().toISO() as string;
  const UTCtoKST_Time = DateTime.fromISO(UTC, { zone: 'Asia/Seoul' }).toFormat('HH:mm');
  const UTCtoKST_Date = DateTime.fromISO(UTC, { zone: 'Asia/Seoul' }).toFormat('yyyy.LL.dd');

  const isToday = today === UTCtoKST_Date;

  return isToday ? `${UTCtoKST_Time} (KST)` : UTCtoKST_Date;
};

export const formatOnlyDate = (prevTimeExpression: string) => {
  return prevTimeExpression.split(' ')[0].replaceAll('-', '.');
};
