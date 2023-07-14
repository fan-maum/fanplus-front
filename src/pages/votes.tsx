import { useState, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { useMediaQuery } from 'react-responsive';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ voteLists, error }: EventProps) => {
  /* mediaQuery 설정 */
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });

  /* 공통 설정 */
  const [tabState, setTabState] = useState<'' | 'B' | 'R'>('');
  const itemsPerPage = !isMobile ? 9 : 5;

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
    loading: false,
    error: null,
    voteList: voteLists.RESULTS.DATAS.DATA,
  };

  const VotePaginationProps: VotePaginationProps = {
    totalCount: voteLists.RESULTS.DATAS.TOTAL_CNT,
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

export const getServerSideProps = async (context: any) => {
  const vote_type = context.query.vote_type || '';
  const page = context.query.page || 1;
  const per_page = Number(context.query.per_page) || 9;
  const lang = context.query.lang || 'ko';

  const res = await fetch(
    `http://localhost:3020/api/votes?vote_type=${vote_type}&page=${
      page - 1
    }&per_page=${per_page}&lang=${lang}`
  );
  const error = res.ok ? false : res.status;

  const voteLists = await res.json();
  return {
    props: { voteLists, error },
  };
};

export default Votes;
