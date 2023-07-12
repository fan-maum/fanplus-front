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

const Votes = ({ initialData }: EventProps) => {
  const router = useRouter();
  const vote_type: any = router.query.vote_type === undefined ? '' : router.query.vote_type;
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
      `https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${
        page - 1
      }&per_page=${per_page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY5NjVjZDg3N2MyMTNkZjYwZWU2NDViMjYxZWJhYjcxMWRkYjIxZTE3OGExOTdjMmQ5NzY1ZTNkYTUyNDI2MDU1Y2QzYWFmMGE5ZTQxODljIiwiaWF0IjoxNjg4MDI0NTEzLjMzMzY4OCwibmJmIjoxNjg4MDI0NTEzLjMzMzY5MSwiZXhwIjoxNzE5NjQ2OTEzLjMxNTE3LCJzdWIiOiIxNzUiLCJzY29wZXMiOltdfQ.bKebFWEEu2ruQS0aj0wbjU3MWldP7lcJdesoiLxVZcf1cMFiOCGjKW2SNmCDCGUMckVu-SWZTpIRs-7YBsa6Ag3BjYMdxjlpzd7iyx3wBnkV4nJDSV46o9DFwGP2_4T9wyiVms1X3kgmW6W0o_domAtFAk5l_ny4s5cdO5faZOSj7weSdgSmLz69PxwrsJZgM-Z24flOB40TiIMgcvA_nzA7sIBe8P_PljpEUZYYXMlcn4V1yGoj_eyJOsFvV88Ep8HRF3hya6DPAs2Q1cwQcaTkchShzO3xYgkqtGhQ6NxBB7nmjpBMQyUhf1HYfLFDH7eWCwWJkUNc8YduvzatvP7wDWWc_h4dpMutMjtwQbjJLFj5bsl5VSpVkW8ev3_ASS97NxNtY6OcUxTrsm0oFCiScy_yDMqXWR3Ym3KJz_Sj4yWujtQ-2Yo4AKih2IlteGX0rTInNQtuk0eKaGF_jQaeIbEx9OWoWM9Akquy1EULcO3Vtzjzqf54fj5H3MkjdkrH5prRh_cBJvB_viNnCLswy3aKnf5QEFRr7I2--8SEw5Y21bHf6B10ol7AvegoYFMS3o3Cy9SrP6YpvAmRzLYnco-8TaRw0a1QgyGGywSxiL2wiVQXbCoK95qwK9FhBProc5xJd0NYgb_7NYDQJ4Ii3ZX3u7TMYZSi56vlkMM`,
        },
      }
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
  const initialData = await initialRowData.json();
  if (!initialData) {
    return false;
  }
  return {
    props: { initialData },
  };
};

export default Votes;
