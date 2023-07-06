import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import css from 'styled-jsx/css';

export interface VoteListItemProps {
  voteData: VoteData;
}

const remainTime = 1;

const VoteListItem = ({ voteData, ...props }: VoteListItemProps) => {
  return (
    <Stack align="center" spacing={12} /* miw={332} */ css={{ cursor: 'pointer' }}>
      <VoteTitle
        remainTime={remainTime}
        endDate={voteData.END_DATE}
        starName={voteData?.FIRST_RANK_STAR_INFO?.STAR_NAME}
      />
      <div
        css={[
          {
            position: 'relative',
            width: '100%',
            aspectRatio: '421/253',
          },
          !remainTime && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.6)',
            },
          },
        ]}
      >
        <Image fill src={voteData.TITLE_IMG} alt="vote_thumbnail" />
      </div>
      <div
        css={[
          {
            color: '#666',
            fontSize: '16px',
            fontWeight: '600',
          },
        ]}
      >
        {voteData.TITLE}
      </div>
    </Stack>
  );
};

export default VoteListItem;
