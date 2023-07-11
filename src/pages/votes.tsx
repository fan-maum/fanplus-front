import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getTestVotes, getVotes } from '@/api/Vote';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { VoteData } from '@/types/vote';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData, initialMobileData }: EventProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const vote_type = router.query.vote_type === undefined ? '' : router.query.vote_type;
  const page = router.query.page === undefined ? 1 : router.query.page;
  const per_page = router.query.per_page === undefined ? 9 : router.query.per_page;
  // const { vote_type, page, per_page }: any = router?.query;
  // const [voteData, setVoteData] = useState(voteInitailDatas);
  // const [loading, setLoading] = useState(false);
  console.log('router.query :',router?.query);
  
  /* mediaQuery 설정 */
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });
  const voteInitialData = !isMobile ? initialData.RESULTS.DATAS.DATA : initialMobileData.RESULTS.DATAS.DATA;
  
  /* 공통 설정 */
  // const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState('');
  // const [totalCount, setTotalCount] = useState(initialData.RESULTS.DATAS.TOTAL_CNT);
  const [tabState, setTabState] = useState<'' | 'B' | 'R'>(vote_type);
  const itemsPerPage = !isMobile ? 9 : 4;
  // const { loading, voteLists, error } = getTestVotes("R", page, per_page);
  // console.log(voteLists);
  // console.log(itemsPerPage);

  const [loading, setLoading] = useState(true);
  const [voteLists, setVoteLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${page - 1}&per_page=${per_page}`)
      .then((res) => res.json())
      .then((lists) => {
        setVoteLists(lists.RESULTS.DATAS.DATA);
        setTotalCount(lists.RESULTS.DATAS.TOTAL_CNT);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

  }, [vote_type, page, per_page]);

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: '전체', value: '' },
      { label: '생일 투표', value: 'B' },
      { label: '리그전', value: 'R' },
    ],
    state: [tabState, setTabState as Dispatch<SetStateAction<string>>],
    itemsPerPage: itemsPerPage,
  };

  useEffect(() => {
    if (mobile) setIsMobile(true);
    if (!mobile) setIsMobile(false);
  }, [mobile]);

  console.log(voteLists);
  const VoteListProps: VoteListProps = {
    isMobile: isMobile,
    // voteList: voteInitialData,
    loading: loading,
    error: error,
    voteList: voteLists,
  };

  const VotePaginationProps: VotePaginationProps = {
    totalCount: totalCount,
    itemsPerPage: itemsPerPage,
    isMobile: isMobile,
  };

  return (
    <VoteTemplate
      voteListTab={<VoteListTab {...VoteListTabProps} />}
      voteList={<VoteList {...VoteListProps} />}
      votePagination={<VotePagination {...VotePaginationProps} />}
    />
  );
};

export const getServerSideProps = async () => {
  const initialRowData = await getVotes('', 0, 9);
  const initialRowMobileData = await getVotes('', 0, 4);
  const initialData = await initialRowData.json();
  const initialMobileData = await initialRowMobileData.json();

  if (!initialData && !initialMobileData) {
    return false;
  }
  return {
    props: { initialData, initialMobileData },
  };
};

export default Votes;
