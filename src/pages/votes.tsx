import { useState, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getCurrentVotes, getVotes } from '@/api/Vote';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData }: EventProps) => {
  const totalCount = 3; //전체 data 갯수
  // const totalCount = initialData.RESULTS.DATAS.RETURN_CNT; //전체 data 갯수
  const [tabState, setTabState] = useState<'' | 'B' | 'R'>('');
  const [data, setDaata] = useState(initialData);
  const itemsPerPage = initialData.RESULTS.DATAS.PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  console.log(initialData);

  const changedData = getVotes("R",0);
  console.log(changedData);

//   // const currentVoteData = useMemo(() => {
//   //   // const firstPageIndex = (currentPage - 1) * itemsPerPage;
//   //   // const lastPageIndex = firstPageIndex + itemsPerPage;
//   //   return data.RESULTS.DATAS.DATA.slice(firstPageIndex, lastPageIndex);
//   // }, [currentPage]);

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: '전체', value: '' },
      { label: '생일 투표', value: 'B' },
      { label: '리그전', value: 'R' },
    ],
    currentPage: currentPage,
    state: [tabState, setTabState as Dispatch<SetStateAction<string>>],
  };

//   const VoteListProps: VoteListProps = {
//     status: tabState,
//     voteList: data,
//   };

  const VotePaginationProps: VotePaginationProps = {
    currentPage: currentPage,
    totalCount: totalCount,
    itemsPerPage: itemsPerPage,
    voteList: data.RESULTS.DATAS.DATA,
    currentData: initialData.RESULTS.DATAS.DATA,
    onPageChange: (page) => setCurrentPage(page),
  };

  return (
      <VoteTemplate
        // voteListTab={<VoteListTab {...VoteListTabProps} />}
        // voteList={<VoteList {...VoteListProps} />}
        votePagination={<VotePagination {...VotePaginationProps} />}
      />
    
  );
};

export const getServerSideProps = async () => {
  const initialData = await getVotes("",0);
  if (!initialData) {
    return false;
  }
  return {
    props: { initialData },
  };
};

export default Votes;
