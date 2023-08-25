import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { Stack } from '@/components/atoms';
import { VoteDetailVoteInfo } from '@/types/vote';
import { FormatTime } from '@/utils/util';
import VoteTitle from '@/components/molecules/VoteTitle';
import VoteTitleImage from '@/components/molecules/VoteTitleImage';
import type { TranslatedVoteStatus } from '../VoteListItem';

export interface VoteListItemProps {
  voteStatus: TranslatedVoteStatus;
  startDay: string;
  endDay: string;
  voteDetailInfo: VoteDetailVoteInfo;
  firstRankStarName: string | undefined;
}

const today = new Date();

const VoteDetailItem = ({
  voteStatus,
  startDay,
  endDay,
  voteDetailInfo,
  firstRankStarName,
  ...props
}: VoteListItemProps) => {
  const endDate = new Date(endDay);
  const startDate = new Date(startDay);
  const [seconds, setSeconds] = useState<number>();
  const interval = useInterval(() => setSeconds((second) => second && second - 1), 1000);

  useEffect(() => {
    if (voteStatus === 'ONGOING') {
      setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
    }
    if (voteStatus === 'READY') {
      setSeconds(Math.floor((startDate.getTime() - today.getTime()) / 1000));
    }
    interval.start();
    return interval.stop;
  }, []);

  const remainTime = FormatTime(seconds);
  return (
    <Stack align="center" spacing={20} css={{ overflow: 'hidden' }}>
      <VoteTitle remainTime={remainTime} voteStatus={voteStatus} starName={firstRankStarName} />
      <VoteTitleImage voteStatus={voteStatus} voteDataImage={voteDetailInfo.TITLE_IMG} />
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
        {voteDetailInfo.TITLE}
      </div>
    </Stack>
  );
};

export default VoteDetailItem;
