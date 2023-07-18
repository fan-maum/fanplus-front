import { useState, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getVotes } from '@/api/Vote';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Layout from '@/components/layout/Layout';
import { FooterText_KR, NavBarText_KR } from '@/texts/ko';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData }: EventProps) => {
  const router = useRouter();
  const vote_type: any = router.query.vote_type === undefined ? '' : router.query.vote_type;
  const page = router.query.page === undefined ? 1 : Number(router.query.page);
  const per_page = router.query.per_page === undefined ? 9 : router.query.per_page;

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
    fetch(`/api/votes?vote_type=${vote_type}&page=${page - 1}&per_page=${per_page}`)
      .then((res) => res.json())
      .then((lists) => {
        console.log(lists);
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

  const VoteListProps: VoteListProps = {
    isMobile: isMobile,
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
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <VoteTemplate
        voteListTab={<VoteListTab {...VoteListTabProps} />}
        voteList={<VoteList {...VoteListProps} />}
        votePagination={<VotePagination {...VotePaginationProps} />}
      />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const initialRowData = await getVotes('', 0, 9);
  const initialData = await initialRowData.json();
  if (!initialData) {
    return false;
  }
  return {
    props: { initialData },
  };
};

export default Votes;
