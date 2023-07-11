import { VoteData } from '@/types/vote';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  isMobile: boolean;
  voteList: VoteData[];
}

function VoteList({ isMobile, voteList, ...props }: VoteListProps) {
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
      {voteList.map((item) => (
        <VoteListItem endDay={item.END_DATE} key={item.VOTE_IDX} voteData={item} />
      ))}
    </div>
  );
}

export default VoteList;
