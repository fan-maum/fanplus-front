import { VoteData } from '@/types/vote';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  voteList: VoteData[];
}

function VoteList({ voteList, ...props }: VoteListProps) {
  return (
    <div
      css={[
        {
          display: 'grid',
          width: '90%',
          maxWidth: '1570px',
          margin: '0 auto',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          gridGap: '4vh',
          '@media(min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media(min-width: 1080px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        },
      ]}
    >
      {voteList.map((item) => (
        <VoteListItem key={item.VOTE_IDX} voteData={item} />
      ))}
    </div>
  );
}

export default VoteList;
