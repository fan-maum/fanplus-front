import { VoteData } from '@/types/vote';
import { Stack } from '../atoms/Stack';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  status: 'A' | 'B' | 'R';
}

function VoteList({ status, ...props }: VoteListProps) {
  return (
    <div
      css={[
        {
          display: 'grid',
          width: '90%',
          maxWidth: '1240px',
          margin: '0 auto',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          gridGap: '8%',
          '@media(min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        },
      ]}
    >
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
    </div>
  );
}

export default VoteList;
