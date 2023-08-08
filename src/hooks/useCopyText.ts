import { VoteDetailStars } from '@/types/vote';
import { getIndexByVotes } from '@/utils/util';
import { useRouter } from 'next/router';

export interface useCopiedTextProps {
  star: VoteDetailStars | null;
  titleText: Array<string>;
  middleText: Array<string>;
  endText: Array<string>;
}
export function useCopiedText(
  star: VoteDetailStars | null,
  titleText: Array<string>,
  middleText: Array<string>,
  endText: Array<string>
) {
  const router = useRouter();
  const checkWindow = () => typeof window !== 'undefined';
  const text = `${titleText[getIndexByVotes(star)]}\n\n${middleText[getIndexByVotes(star)]}\n\n${
    endText[getIndexByVotes(star)]
  }`;
  const url = star
    ? `${checkWindow() ? window.location.origin : ''}${router.asPath}&id=${star?.STAR_IDX}`
    : `${checkWindow() ? window.location.origin : ''}${router.asPath}`;

  return { text, url };
}
