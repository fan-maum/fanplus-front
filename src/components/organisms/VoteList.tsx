import { VoteResponse } from '@/types/vote';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  status: 'A' | 'B' | 'R';
  list: VoteResponse;
}

function VoteList({ status, list, ...props }: VoteListProps) {
  console.log(list);
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
