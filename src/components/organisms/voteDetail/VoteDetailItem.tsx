import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { Stack } from '@/components/atoms';
import { VoteDetailVoteInfo } from '@/types/vote';
import { FormatTime } from '@/utils/util';
import VoteTitle from '@/components/molecules/VoteTitle';
import VoteTitleImage from '@/components/molecules/VoteTitleImage';

export interface VoteListItemProps {
  endDay: string;
  voteDetailInfo: VoteDetailVoteInfo;
  firstRankStarName: string | undefined;
}

const today = new Date();

const VoteDetailItem = ({
  endDay,
  voteDetailInfo,
  firstRankStarName,
  ...props
}: VoteListItemProps) => {
  const endDate = new Date(endDay);
  const [seconds, setSeconds] = useState<number>();
  const interval = useInterval(() => setSeconds((second) => second && second - 1), 1000);

  useEffect(() => {
    interval.start();
    setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
    return interval.stop;
  }, []);

  const remainTime = FormatTime(seconds);
  const remainTimeState = FormatTime(seconds) !== '종료' ? true : false;
  return (
    <Stack align="center" spacing={20} css={{ overflow: 'hidden' }}>
      <VoteTitle
        remainTime={remainTime}
        remainTimeState={remainTimeState}
        starName={firstRankStarName}
      />
      <VoteTitleImage remainTimeState={remainTimeState} voteDataImage={voteDetailInfo.TITLE_IMG} />
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
