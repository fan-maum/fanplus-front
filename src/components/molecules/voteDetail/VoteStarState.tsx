import { Group, Stack, Avatar } from '@/components/atoms';
import { VoteDetailStars } from '@/types/vote';
import { formatNumberWithComma } from '@/utils/util';
import Image from 'next/image';

export interface VoteStarStateProps {
  starData: VoteDetailStars;
}

const GRADIENT = [
  'linear-gradient(132.76deg, #FFF1D2 8.43%, #F8AC05 90.38%);',
  'linear-gradient(320.33deg, #9CA3A8 14.77%, #DBE7F0 85.62%);',
  'linear-gradient(317.25deg, #F18241 15.74%, #FFD9AF 84%);',
];

function VoteStarState({ starData, ...props }: VoteStarStateProps) {
  const rank = Number(starData.RANK);
  const Top3 = rank < 4;
  return (
    <Group spacing={16} align={'center'}>
      {Top3 ? (
        <Image
          width={50}
          height={50}
          src={`/icons/icon_medal${starData.RANK}.png`}
          alt="icon_medal"
        />
      ) : (
        <div css={{ width: 50, textAlign: 'center', fontWeight: 600, fontSize: 22, color: '#666' }}>
          {starData.RANK}
        </div>
      )}
      <Avatar
        css={
          starData.RANK && Top3
            ? {
                background: Top3 ? GRADIENT[rank - 1] : '#F2F4F5',
                padding: 2,
              }
            : {
                background: '#F2F4F5',
                padding: 2,
              }
        }
        imageProps={{
          style: { borderRadius: '10px' },
        }}
        w={45}
        h={60}
        radius={10}
        color="secondary.500"
        src={starData.PROFILE_IMG}
        alt="Avatar"
      />
      <Stack spacing={4} fw={600} fz={17}>
        <div css={{ color: '#101010' }}>{starData.STAR_NAME}</div>
        <div
          css={{
            fontSize: 18,
            color: '#666',
          }}
        >
          {formatNumberWithComma(Number(starData.VOTE_CNT)) || 0} 표
        </div>
      </Stack>
    </Group>
  );
}

export default VoteStarState;
