import { PromotionVoteData } from '@/types/event';
import Image from 'next/image';
import { Group } from '../atoms';
// import { Avatar, Group, Typography } from './base';

export interface PromotionStarAvatarProps {
  starData: PromotionVoteData;
  isBordered: boolean;
}

const GRADIENT = [
  'linear-gradient(132.76deg, #FFF1D2 8.43%, #F8AC05 90.38%);',
  'linear-gradient(320.33deg, #9CA3A8 14.77%, #DBE7F0 85.62%);',
  'linear-gradient(317.25deg, #F18241 15.74%, #FFD9AF 84%);',
];

function VoteStarAvatar({ starData: starState, isBordered, ...props }: PromotionStarAvatarProps) {
  const isRanked = starState.rank < 4;

  return (
    <>
      <Group spacing={16} align={isRanked ? 'center' : undefined}>
        {isRanked && starState.votes ? (
          <Image
            // mt={-16}
            width={58}
            height={72}
            src={`/icons/PromotionMedal_${starState.rank}.png`}
            alt="랭킹 아이콘"
            style={{ marginTop: -45 }}
          />
        ) : (
          // <Typography category="subtitle" color="gray.700">
            {starState.votes ? starState.rank : '-'}
          // </Typography>
        )}
        {/* <Avatar
          css={
            isBordered || (starState.votes && isRanked)
              ? {
                  background: isRanked ? GRADIENT[starState.rank - 1] : colors.gradient[3],
                  padding: 4,
                }
              : {}
          }
          imageProps={{
            style: {
              borderRadius: '50%',
              border:
                isBordered || (starState.votes && isRanked)
                  ? '4px solid #fff'
                  : `1px solid ${colors.gray[300]}`,
            },
          }}
          color="secondary.500"
          size={84}
          src={starState.image}
          alt="Avatar"
        /> */}
      </Group>
    </>
  );
}

export default VoteStarAvatar;
