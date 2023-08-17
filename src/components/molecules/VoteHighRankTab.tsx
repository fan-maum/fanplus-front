import { Stack } from '../atoms';
import RankProfile from '../atoms/RankProfile';
import Image from 'next/image';
import { formatNumberWithComma } from '@/utils/util';

export type VoteStatus = 'N' | 'E' | 'R';

export type VoteHighRankTabProps = {
  status: VoteStatus;
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
  if (status === 'N') {
    return (
      <Stack spacing={20} mih={65} justify="center" align="center" direct="row" m={'0 auto'}>
        <RankProfile align="end">
          <Image width={36} height={36} src={'/icons/icon_medal1.png'} alt="icon_medal" />
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
          <Image width={36} height={36} src={'/icons/icon_medal2.png'} alt="icon_medal" />
          {stars.secondRankStarName}
        </RankProfile>
      </Stack>
    );
  }
  if (status === 'E') {
    return (
      <Stack spacing={5} mih={65} justify="center" align="center" direct="column" m={'0 auto'}>
        <RankProfile fontSize={18} fontWeight={700} color="#FF5656" flex={'none'}>
          <div>[ {votes.voteResult} ]</div>
        </RankProfile>
        <RankProfile flexDirection="row" align="center" maxHeight="36px">
          <Image width={36} height={36} src={'/icons/icon_medal1.png'} alt="icon_medal" />
          {stars.firstRankStarName}
        </RankProfile>
      </Stack>
    );
  }
  return null;
};

export default VoteHighRankTab;
