import { useState, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getCurrentVotes, getVotes } from '@/api/Vote';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData, initialCurrentData }: EventProps) => {
  const [data, setData] = useState(initialData);
  const [currentData, setCurrentData] = useState(initialCurrentData);
  const [tabState, setTabState] = useState<'A' | 'B' | 'R'>('A');
  const totalCount = data.RESULTS.DATAS.PER_PAGE;
  const itemsPerPage = currentData.RESULTS.DATAS.PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const currentVoteData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return data.RESULTS.DATAS.DATA.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  /** 
   총 게시물 갯수 9개
   가져와야하는 게시물 갯수 6개
  **/

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: '전체', value: '' },
      { label: '생일 투표', value: 'B' },
      { label: '리그전', value: 'R' },
    ],
    currentPage: currentPage,
    state: [tabState, setTabState as Dispatch<SetStateAction<string>>],
  };

  const VoteListProps: VoteListProps = {
    status: tabState,
    voteList: data,
  };

  const VotePaginationProps: VotePaginationProps = {
    currentPage: currentPage,
    totalCount: totalCount,
    itemsPerPage: itemsPerPage,
    voteList: data.RESULTS.DATAS.DATA,
    currentData: currentData.RESULTS.DATAS.DATA,
    onPageChange: (page) => setCurrentPage(page),
  };

  return (
    <div>
      <VoteTemplate
        voteListTab={<VoteListTab {...VoteListTabProps} />}
        voteList={<VoteList {...VoteListProps} />}
        votePagination={<VotePagination {...VotePaginationProps} />}

        // 총 array 개수 (Votes)
        // 총 page 개수 (Votes)
        // 페이지마다 보여줄 items 개수 ()
        // 페이지마다 보여줄 items
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const initialData = await getVotes();
  const initialCurrentData = await getCurrentVotes();
  if (!initialData && !initialCurrentData) {
    return false;
  }
  return {
    props: { initialData, initialCurrentData },
  };
};

export default Votes;
