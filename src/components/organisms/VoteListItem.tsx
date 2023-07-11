import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';

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
        <img
          src={voteData.TITLE_IMG}
          alt="vote_thumbnail"
          css={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>
      <div
        css={[
          {
            color: '#5C6B70',
            fontSize: '18px',
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
