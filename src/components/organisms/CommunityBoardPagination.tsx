import { useRouter } from 'next/router';
import PaginationBase from '../molecules/PaginationBase';

// TODO: totalCount 값을 api를 통해 받아와야 함..

const CommunityBoardPagination = ({ totalCount = 1 }: { totalCount: number }) => {
  const router = useRouter();
  const pageCount = Math.ceil(totalCount / 20);
  const { page } = router.query;
  const forcePage = Number(page) || 1;
  const handlePageChange = (event: { selected: number }) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: event.selected + 1,
      },
    });
  };
  return (
    <PaginationBase
      pageRangeDisplayed={6}
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={handlePageChange}
    />
  );
};

export default CommunityBoardPagination;
