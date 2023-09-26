import { Stack } from '../atoms';
import RankProfile from '../atoms/RankProfile';
import { formatNumberWithComma } from '@/utils/util';
import type { TranslatedVoteStatus } from '../organisms/VoteListItem';

export type VoteHighRankTabProps = {
  status: TranslatedVoteStatus;
  stars: {
    firstRankStarName: string;
    secondRankStarName: string;
  };
  votes: {
    voteResult: string;
    voteDiff: number;
    voteDiffFront: string;
    voteDiffBack: string;
  };
};

const VoteHighRankTab = ({ status, stars, votes }: VoteHighRankTabProps) => {
  if (status === 'ONGOING') {
    return (
      <Stack spacing={20} mih={65} justify="center" align="center" direct="row" m={'0 auto'}>
        <RankProfile align="end">
          <img src="/icons/icon_medal1.png" alt="icon_medal" css={{ width: 36, height: 36 }} />
          {stars.firstRankStarName}
        </RankProfile>
        <RankProfile maxWidth={'50%'} fontSize={18} fontWeight={700} color="#FF5656" flex={'none'}>
          <div>[ LIVE ]</div>
          <div>
            {votes.voteDiffFront}
            <span css={{ padding: '0 3px' }}>{formatNumberWithComma(votes.voteDiff)}</span>
            {votes.voteDiffBack}
          </div>
        </RankProfile>
        <RankProfile align="start">
          <img src="/icons/icon_medal2.png" alt="icon_medal" css={{ width: 36, height: 36 }} />
          {stars.secondRankStarName}
        </RankProfile>
      </Stack>
    );
  }
  if (status === 'END') {
    return (
      <Stack spacing={5} mih={65} justify="center" align="center" direct="column" m={'0 auto'}>
        <RankProfile fontSize={18} fontWeight={700} color="#FF5656" flex={'none'}>
          <div>[ {votes.voteResult} ]</div>
        </RankProfile>
        <RankProfile flexDirection="row" align="center" maxHeight="36px">
          <img src="/icons/icon_medal1.png" alt="icon_medal" css={{ width: 36, height: 36 }} />
          {stars.firstRankStarName}
        </RankProfile>
      </Stack>
    );
  }
  return null;
};

export default VoteHighRankTab;
