import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { Stack } from '@/components/atoms';
import { VoteDetailVoteInfo } from '@/types/vote';
import { FormatTime } from '@/utils/util';
import VoteTitle from '@/components/molecules/VoteTitle';
import VoteTitleImage from '@/components/molecules/VoteTitleImage';
import { VoteStatus } from '@/components/molecules/VoteHighRankTab';

export interface VoteListItemProps {
  voteStatus: VoteStatus;
  startDay: string;
  endDay: string;
  voteDetailInfo: VoteDetailVoteInfo;
  firstRankStarName: string | undefined;
}

const today = new Date();

const VoteDetailItem = ({
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
    if (voteDetailInfo.STATUS === 'N') {
      setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
    }
    if (voteDetailInfo.STATUS === 'R') {
      setSeconds(Math.floor((startDate.getTime() - today.getTime()) / 1000));
    }
    interval.start();
    return interval.stop;
  }, []);

  const remainTime = FormatTime(seconds);

  const remainTimeState = FormatTime(seconds) !== '종료' ? true : false;
  return (
    <Stack align="center" spacing={20} css={{ overflow: 'hidden' }}>
      <VoteTitle
        remainTime={remainTime}
        voteStatus={voteDetailInfo.STATUS as VoteStatus}
        starName={firstRankStarName}
      />
      <VoteTitleImage
        voteStatus={voteDetailInfo.STATUS as VoteStatus}
        voteDataImage={voteDetailInfo.TITLE_IMG}
      />
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
