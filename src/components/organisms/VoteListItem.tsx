import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import { formatTime } from '@/utils/util';
import Link from 'next/link';
import { getVoteDetailLanguage } from '@/hooks/useLanguage';

export interface VoteListItemProps {
  endDay: string;
  voteData: VoteData;
}

const today = new Date();

const VoteListItem = ({ endDay, voteData, ...props }: VoteListItemProps) => {
  const voteDetailLang = getVoteDetailLanguage();
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
    <Stack align="center" spacing={12} css={{ cursor: 'pointer', overflow: 'hidden' }}>
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
          href={`https://vote.fanplus.co.kr/?vote=${voteData.VOTE_IDX}&lang=${voteDetailLang}`}
          target="_blank"
        >
          <div
            css={[
              !remainTimeState && {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.6)',
                },
              },
            ]}
          >
            <img
              src={voteData.TITLE_IMG}
              alt="vote_thumbnail"
              css={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </div>
        </Link>
      </div>
      <div
        css={[
          {
            color: '#5C6B70',
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
