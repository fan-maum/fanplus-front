import { useState, Dispatch, SetStateAction } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getVotes } from '@/api/Vote';

export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData }: EventProps) => {
  const [data, setData] = useState(initialData);
  const [tabState, setTabState] = useState<'A' | 'B' | 'R'>('A');

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: '전체', value: 'A' },
      { label: '생일 투표', value: 'B' },
      { label: '리그전', value: 'R' },
    ],
    state: [tabState, setTabState as Dispatch<SetStateAction<string>>],
  };

  const VoteListProps: VoteListProps = {
    status: tabState,
    voteList: data,
  };

  return (
    <div>
      <VoteTemplate
        voteListTab={<VoteListTab {...VoteListTabProps} />}
        voteList={<VoteList {...VoteListProps} />}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const initialData = await getVotes();
  if (!initialData) {
    return false;
  }
  return {
    props: { initialData },
  };
};

export default Votes;
