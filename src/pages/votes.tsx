import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { getVotes } from '@/api/Vote';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ initialData }: EventProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const voteInitailDatas = initialData.RESULTS.DATAS.DATA;

  const [totalCount, setTotalCount] = useState(initialData.RESULTS.DATAS.TOTAL_CNT);
  const [tabState, setTabState] = useState('');
  // const [tabState, setTabState] = useState<'' | 'B' | 'R'>('');
  const [voteData, setVoteData] = useState(voteInitailDatas);
  const itemsPerPage = initialData.RESULTS.DATAS.PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const { vote_Type, page, perPage } = router?.query;

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: '전체', value: '' },
      { label: '생일 투표', value: 'B' },
      { label: '리그전', value: 'R' },
    ],
    currentPage: currentPage,
    state: [tabState, setTabState as Dispatch<SetStateAction<string>>],
    handleClickTab: (tabValue) => {
      const initPageCount = 0;
      const paramsObj = { vote_Type: tabValue, page: (currentPage - 1).toString(), perPage: '2' };
      const searchParams = new URLSearchParams(paramsObj);
      console.log('searchParams.toString()', searchParams.toString());
      router.push(pathname + '?' + searchParams.toString());

      if (tabState !== tabValue) {
        setTabState(tabValue);
      }

      console.log(tabValue);
      fetch(
        `https://cors-anywhere.herokuapp.com/https://napi.appphotocard.com/v2/votes/votes?vote_type=${tabValue}&page=${initPageCount}&per_page=9`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY5NjVjZDg3N2MyMTNkZjYwZWU2NDViMjYxZWJhYjcxMWRkYjIxZTE3OGExOTdjMmQ5NzY1ZTNkYTUyNDI2MDU1Y2QzYWFmMGE5ZTQxODljIiwiaWF0IjoxNjg4MDI0NTEzLjMzMzY4OCwibmJmIjoxNjg4MDI0NTEzLjMzMzY5MSwiZXhwIjoxNzE5NjQ2OTEzLjMxNTE3LCJzdWIiOiIxNzUiLCJzY29wZXMiOltdfQ.bKebFWEEu2ruQS0aj0wbjU3MWldP7lcJdesoiLxVZcf1cMFiOCGjKW2SNmCDCGUMckVu-SWZTpIRs-7YBsa6Ag3BjYMdxjlpzd7iyx3wBnkV4nJDSV46o9DFwGP2_4T9wyiVms1X3kgmW6W0o_domAtFAk5l_ny4s5cdO5faZOSj7weSdgSmLz69PxwrsJZgM-Z24flOB40TiIMgcvA_nzA7sIBe8P_PljpEUZYYXMlcn4V1yGoj_eyJOsFvV88Ep8HRF3hya6DPAs2Q1cwQcaTkchShzO3xYgkqtGhQ6NxBB7nmjpBMQyUhf1HYfLFDH7eWCwWJkUNc8YduvzatvP7wDWWc_h4dpMutMjtwQbjJLFj5bsl5VSpVkW8ev3_ASS97NxNtY6OcUxTrsm0oFCiScy_yDMqXWR3Ym3KJz_Sj4yWujtQ-2Yo4AKih2IlteGX0rTInNQtuk0eKaGF_jQaeIbEx9OWoWM9Akquy1EULcO3Vtzjzqf54fj5H3MkjdkrH5prRh_cBJvB_viNnCLswy3aKnf5QEFRr7I2--8SEw5Y21bHf6B10ol7AvegoYFMS3o3Cy9SrP6YpvAmRzLYnco-8TaRw0a1QgyGGywSxiL2wiVQXbCoK95qwK9FhBProc5xJd0NYgb_7NYDQJ4Ii3ZX3u7TMYZSi56vlkMM`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalCount(data.RESULTS.DATAS.TOTAL_CNT);
          setVoteData(data.RESULTS?.DATAS?.DATA);
        });
    },
  };

  useEffect(() => {
    console.log(router.query);
    if (router.query.vote_Type === '') {
      console.log(router.query.vote_Type);
      setTabState('');
    }
    if (router.query.vote_Type === 'R') {
      console.log(router.query.vote_Type);
      setTabState('R');
    }
    if (router.query.vote_Type === 'B') {
      setTabState('B');
    }
  }, []);

  const VoteListProps: VoteListProps = {
    voteList: voteData,
  };

  const VotePaginationProps: VotePaginationProps = {
    currentPage: currentPage,
    totalCount: totalCount,
    itemsPerPage: itemsPerPage,
    voteList: voteData?.RESULTS?.DATAS?.DATA,
    onPageChange: (page: { selected: number }) => {
      // const paramsObj = {
      //   vote_Type: tabState,
      //   page: page.selected,
      //   perPage: '2',
      // };
      const paramsObj = { vote_Type: tabState, page: page.selected.toString(), perPage: '2' };
      const searchParams = new URLSearchParams(paramsObj);
      // setCurrentPage(page.selected)
      router.push(pathname + '?' + searchParams.toString());

      fetch(
        `https://cors-anywhere.herokuapp.com/https://napi.appphotocard.com/v2/votes/votes?vote_type=${tabState}&page=${page.selected}&per_page=9`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY5NjVjZDg3N2MyMTNkZjYwZWU2NDViMjYxZWJhYjcxMWRkYjIxZTE3OGExOTdjMmQ5NzY1ZTNkYTUyNDI2MDU1Y2QzYWFmMGE5ZTQxODljIiwiaWF0IjoxNjg4MDI0NTEzLjMzMzY4OCwibmJmIjoxNjg4MDI0NTEzLjMzMzY5MSwiZXhwIjoxNzE5NjQ2OTEzLjMxNTE3LCJzdWIiOiIxNzUiLCJzY29wZXMiOltdfQ.bKebFWEEu2ruQS0aj0wbjU3MWldP7lcJdesoiLxVZcf1cMFiOCGjKW2SNmCDCGUMckVu-SWZTpIRs-7YBsa6Ag3BjYMdxjlpzd7iyx3wBnkV4nJDSV46o9DFwGP2_4T9wyiVms1X3kgmW6W0o_domAtFAk5l_ny4s5cdO5faZOSj7weSdgSmLz69PxwrsJZgM-Z24flOB40TiIMgcvA_nzA7sIBe8P_PljpEUZYYXMlcn4V1yGoj_eyJOsFvV88Ep8HRF3hya6DPAs2Q1cwQcaTkchShzO3xYgkqtGhQ6NxBB7nmjpBMQyUhf1HYfLFDH7eWCwWJkUNc8YduvzatvP7wDWWc_h4dpMutMjtwQbjJLFj5bsl5VSpVkW8ev3_ASS97NxNtY6OcUxTrsm0oFCiScy_yDMqXWR3Ym3KJz_Sj4yWujtQ-2Yo4AKih2IlteGX0rTInNQtuk0eKaGF_jQaeIbEx9OWoWM9Akquy1EULcO3Vtzjzqf54fj5H3MkjdkrH5prRh_cBJvB_viNnCLswy3aKnf5QEFRr7I2--8SEw5Y21bHf6B10ol7AvegoYFMS3o3Cy9SrP6YpvAmRzLYnco-8TaRw0a1QgyGGywSxiL2wiVQXbCoK95qwK9FhBProc5xJd0NYgb_7NYDQJ4Ii3ZX3u7TMYZSi56vlkMM`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalCount(data.RESULTS.DATAS.TOTAL_CNT);
          setVoteData(data.RESULTS?.DATAS?.DATA);
        });
    },
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
  const initialRowData = await getVotes('', 0);
  const initialData = await initialRowData.json();

  if (!initialData) {
    return false;
  }
  return {
    props: { initialData },
  };
};

export default Votes;
