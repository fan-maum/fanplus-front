import { memo } from 'react';
import { VoteData } from '@/types/vote';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  voteList: VoteData[];
  loading: boolean;
  error: string | null;
}

function VoteList({ voteList, loading, error, ...props }: VoteListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div
      css={[
        {
          display: 'grid',
          width: '90%',
          maxWidth: '1570px',
          margin: '0 auto',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gridGap: '4vh',
          '@media(max-width: 1024px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media(max-width: 768px)': {
            gridTemplateColumns: '1fr',
          },
        },
      ]}
    >
      {voteList?.map((item) => (
        <VoteListItem
          startDay={item.START_DATE}
          endDay={item.END_DATE}
          key={item.VOTE_IDX}
          voteData={item}
        />
      ))}
    </div>
  );
}

export default memo(VoteList);
