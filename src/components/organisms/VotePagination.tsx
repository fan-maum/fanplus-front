import { useRouter } from 'next/router';
import PcVotePagination from './PcVotePagination';
import MobileVotePagination from './MobileVotePagination';

export interface VotePaginationProps {
  // currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  isMobile: boolean;
  // onPageChange: (page: { selected: number }) => void;
}

const VotePagination = ({ totalCount, itemsPerPage, isMobile }: VotePaginationProps) => {
  const router = useRouter();
  const { vote_type, page, per_page } = router.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / itemsPerPage);
  console.log(router.query);

  const onPageChange = (page: { selected: number }) => {
    //   const paramsObj = { vote_Type: tabState, page: page.selected.toString(), perPage: '9' };
    //   const searchParams = new URLSearchParams(paramsObj);
    //   router.push(pathname + '?' + searchParams.toString());
    //   fetch(
    //     `https://cors-anywhere.herokuapp.com/https://napi.appphotocard.com/v2/votes/votes?vote_type=${tabState}&page=${page.selected}&per_page=${itemsPerPage}`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY5NjVjZDg3N2MyMTNkZjYwZWU2NDViMjYxZWJhYjcxMWRkYjIxZTE3OGExOTdjMmQ5NzY1ZTNkYTUyNDI2MDU1Y2QzYWFmMGE5ZTQxODljIiwiaWF0IjoxNjg4MDI0NTEzLjMzMzY4OCwibmJmIjoxNjg4MDI0NTEzLjMzMzY5MSwiZXhwIjoxNzE5NjQ2OTEzLjMxNTE3LCJzdWIiOiIxNzUiLCJzY29wZXMiOltdfQ.bKebFWEEu2ruQS0aj0wbjU3MWldP7lcJdesoiLxVZcf1cMFiOCGjKW2SNmCDCGUMckVu-SWZTpIRs-7YBsa6Ag3BjYMdxjlpzd7iyx3wBnkV4nJDSV46o9DFwGP2_4T9wyiVms1X3kgmW6W0o_domAtFAk5l_ny4s5cdO5faZOSj7weSdgSmLz69PxwrsJZgM-Z24flOB40TiIMgcvA_nzA7sIBe8P_PljpEUZYYXMlcn4V1yGoj_eyJOsFvV88Ep8HRF3hya6DPAs2Q1cwQcaTkchShzO3xYgkqtGhQ6NxBB7nmjpBMQyUhf1HYfLFDH7eWCwWJkUNc8YduvzatvP7wDWWc_h4dpMutMjtwQbjJLFj5bsl5VSpVkW8ev3_ASS97NxNtY6OcUxTrsm0oFCiScy_yDMqXWR3Ym3KJz_Sj4yWujtQ-2Yo4AKih2IlteGX0rTInNQtuk0eKaGF_jQaeIbEx9OWoWM9Akquy1EULcO3Vtzjzqf54fj5H3MkjdkrH5prRh_cBJvB_viNnCLswy3aKnf5QEFRr7I2--8SEw5Y21bHf6B10ol7AvegoYFMS3o3Cy9SrP6YpvAmRzLYnco-8TaRw0a1QgyGGywSxiL2wiVQXbCoK95qwK9FhBProc5xJd0NYgb_7NYDQJ4Ii3ZX3u7TMYZSi56vlkMM`,
    //       },
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setTotalCount(data.RESULTS.DATAS.TOTAL_CNT);
    //       if (!isMobile) setVoteData(data.RESULTS?.DATAS?.DATA);
    //       if (isMobile) {
    //         // setVoteData(...voteData, ...data.RESULTS?.DATAS?.DATA)
    //         setVoteData([...voteData, ...data.RESULTS.DATAS?.DATA]);
    //         console.log([...voteData, ...data.RESULTS.DATAS?.DATA]);
    //       }
    //       // isMobile ? setVoteData((datas) => (...datas, ...data.RESULTS?.DATAS?.DATA)
    //       //          : setVoteData(data.RESULTS?.DATAS?.DATA);
    //       // if (isMobile) {
    //       //   });
    //       //   console.log(voteData);
    //       // } else {
    //       //   setVoteData(data.RESULTS?.DATAS?.DATA);
    //       // }
    //     });
    // },
  };

  return !isMobile ? (
    <PcVotePagination pageCount={pageCount} onPageChange={onPageChange} />
  ) : (
    <MobileVotePagination pageCount={pageCount} onPageChange={onPageChange} />
  );
};

export default VotePagination;
