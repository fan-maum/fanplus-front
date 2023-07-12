import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getTestVotes, getVotes } from '@/api/Vote';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData, initialMobileData }: EventProps) => {
  const router = useRouter();
  const vote_type = router.query.vote_type === undefined ? '' : router.query.vote_type;
  const page = router.query.page === undefined ? 1 : Number(router.query.page);
  const per_page = router.query.per_page === undefined ? 9 : router.query.per_page;
  console.log('router.query :', router?.query);

  /* mediaQuery 설정 */
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });

  /* 공통 설정 */
  const [totalCount, setTotalCount] = useState<number>(0);
  const [tabState, setTabState] = useState<'' | 'B' | 'R'>(vote_type);
  const itemsPerPage = !isMobile ? 9 : 5;

  const [loading, setLoading] = useState(true);
  const [voteLists, setVoteLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${
        page - 1
      }&per_page=${per_page}`
    )
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
    state: [tabState, setTabState],
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
  const initialRowMobileData = await getVotes('', 0, 5);
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
