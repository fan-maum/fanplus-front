import { VoteResponse } from '@/types/vote';
import VoteListItem from './VoteListItem';

export interface VoteListProps {
  status: 'A' | 'B' | 'R';
  voteList: VoteResponse;
}

function VoteList({ status, voteList, ...props }: VoteListProps) {
  const voteDatas = voteList.RESULTS.DATAS.DATA;
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
      {voteDatas.map((item) => (
        <VoteListItem key={item.VOTE_IDX} voteData={item} />
      ))}
    </div>
  );
}

export default VoteList;
