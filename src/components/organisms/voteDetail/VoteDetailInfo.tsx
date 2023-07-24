import { VoteDetailVoteInfo } from '@/types/vote';
import VoteListItem from '@/components/organisms/VoteListItem';
import { Button } from '@/components/atoms/Button';
import { Divider } from '@/components/atoms/Divider';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';
import { wrap } from 'module';
import { Avatar, Stack } from '@/components/atoms';
import { formatNumberWithComma } from '@/utils/util';
import RankProfile from '@/components/atoms/RankProfile';

export interface VoteDetailInfoProps {
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailInfo = ({ voteDetailInfo, ...props }: VoteDetailInfoProps) => {
  const firstRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '1');
  const secondRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '2');
  return (
    <div css={{ padding: '0 16px' }}>
      <VoteListItem endDay={voteDetailInfo.END_DATE} voteData={voteDetailInfo} />
      <Stack spacing={50} maw={320} h={100} align="center" direct="row" m={'0 auto'}>
        <RankProfile>
          <img width={36} src={'/icons/icon_medal1.png'} alt="icon_medal" />
          {firstRankStar?.STAR_NAME}
        </RankProfile>
        <RankProfile fontSize={18} fontWeight={700} color="#FF5656">
          <div>[ LIVE ]</div>
          <div>{formatNumberWithComma(voteDetailInfo.VOTE_CNT_GAP)}표 차이</div>
        </RankProfile>
        <RankProfile>
          <img width={36} src={'/icons/icon_medal2.png'} alt="icon_medal" />
          {secondRankStar?.STAR_NAME}
        </RankProfile>
      </Stack>
      <Stack align="center" justify="center">
        <UnstyledButton
          px={50}
          css={{
            height: 60,
            borderRadius: '10px',
            background: '#FCEEEE',
            color: '#FC5280',
            fontSize: '17px',
            fontWeight: 600,
            margin: '0 auto 40px auto',
          }}
        >
          <Center>
            팬플러스 '리그전'이란 자세히 알아보기
            <img src="/icons/icon_pinkArrow.svg" alt="arrow" />
          </Center>
        </UnstyledButton>
      </Stack>
    </div>
  );
};

export default VoteDetailInfo;
