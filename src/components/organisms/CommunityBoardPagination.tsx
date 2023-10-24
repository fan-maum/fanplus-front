import { useRouter } from 'next/router';
import PaginationBase from '../molecules/PaginationBase';

const CommunityBoardPagination = ({
  totalCount,
  handlePageChange,
}: {
  totalCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}) => {
  const router = useRouter();
  const pageCount = Math.ceil(totalCount / 20);
  const { page } = router.query;
  const forcePage = Number(page) || 1;
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
