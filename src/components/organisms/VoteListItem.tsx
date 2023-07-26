import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import { formatTime } from '@/utils/util';
import Link from 'next/link';
import { getLanguage, getRouterLanguage } from '@/hooks/useLanguage';
import VoteTitleImage from '../molecules/VoteTitleImage';

export interface VoteListItemProps {
  endDay: string;
  voteData: VoteData;
}

const today = new Date();

const VoteListItem = ({ endDay, voteData, ...props }: VoteListItemProps) => {
  const language = getLanguage();
  const voteDetailLanguage = getRouterLanguage();
  const endDate = new Date(endDay);
  const [seconds, setSeconds] = useState<number>();
  const interval = useInterval(() => setSeconds((second) => second && second - 1), 1000);

  useEffect(() => {
    interval.start();
    setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
    return interval.stop;
  }, []);

  const remainTime = formatTime(seconds);
  const remainTimeState = formatTime(seconds) !== '종료' ? true : false;

  return (
    <Stack align="center" spacing={20} css={{ cursor: 'pointer', overflow: 'hidden' }}>
      <VoteTitle
        remainTime={remainTime}
        remainTimeState={remainTimeState}
        starName={voteData?.FIRST_RANK_STAR_INFO?.STAR_NAME}
      />
      <div
        css={[
          {
            position: 'relative',
            width: '100%',
            aspectRatio: '421/253',
          },
        ]}
      >
        <Link
          href={{
            pathname: `/${language}/voteDetail`,
            query: { vote_IDX: voteData.VOTE_IDX, lang: voteDetailLanguage },
          }}
          target="_blank"
        >
          <VoteTitleImage remainTimeState={remainTimeState} voteDataImage={voteData.TITLE_IMG} />
        </Link>
      </div>
      <div
        css={[
          {
            color: '#101010',
            fontSize: '18px',
            fontWeight: '600',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            width: '100%',
          },
        ]}
      >
        {voteData.TITLE}
      </div>
    </Stack>
  );
};

export default VoteListItem;
