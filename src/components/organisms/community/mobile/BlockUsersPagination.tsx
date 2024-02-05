import PaginationBase from '@/components/molecules/PaginationBase';
import { useRouter } from 'next/router';

const BlockUsersPagination = ({
  totalCount,
  handlePageChange,
}: {
  totalCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}) => {
  const router = useRouter();
  const { page } = router.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / 20);

  return (
    <PaginationBase pageCount={pageCount} forcePage={forcePage} onPageChange={handlePageChange} />
  );
};

export default BlockUsersPagination;
