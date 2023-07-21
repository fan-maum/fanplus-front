import { Group, Stack, Typography } from '@/components/atoms';
import VoteStarAvatar from '@/components/atoms/VoteStarAvatar';
import { VoteDetailStars } from '@/types/vote';

export interface VoteStarStateProps {
  starData: VoteDetailStars;
}

function VoteStarState({ starData, ...props }: VoteStarStateProps) {
  return (
    <Group spacing={16}>
      <VoteStarAvatar starData={starData} />
      <Stack spacing={4}>
        <Typography category="subtitle" variant={2} color={'gray.750'}>
          {starData.STAR_NAME}
        </Typography>
        <Typography category="caption" style={{ display: 'flex' }} color={'gray.750'}>
          {starData.VOTE_CNT || 0} 표
        </Typography>
      </Stack>
    </Group>
  );
}

export default VoteStarState;
