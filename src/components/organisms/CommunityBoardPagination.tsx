import { useRouter } from 'next/router';
import PaginationBase from '../molecules/PaginationBase';

const CommunityBoardPagination = ({
  boardType,
  totalCount,
  viewPossiblePage,
  handlePageChange,
}: {
  boardType?: string;
  totalCount?: number;
  viewPossiblePage: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}) => {
  const router = useRouter();
  const { page } = router.query;
  const forcePage = Number(page) || 1;
  const perPage = 20;

  const total = perPage * (forcePage + viewPossiblePage - 1);
  const pageCount = boardType
    ? Math.ceil(total / perPage)
    : totalCount && Math.ceil(totalCount / perPage);

  return (
    <PaginationBase
      pageRangeDisplayed={6}
      pageCount={pageCount || 1}
      forcePage={forcePage}
      onPageChange={handlePageChange}
    />
  );
};

export default CommunityBoardPagination;
