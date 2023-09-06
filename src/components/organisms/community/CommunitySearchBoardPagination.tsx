import { useRouter } from 'next/router';
import PaginationBase from '@/components/molecules/PaginationBase';

export interface VotePaginationProps {
  totalCount: number;
  itemsPerPage: number;
}

const CommunitySearchBoardPagination = ({ totalCount, itemsPerPage }: VotePaginationProps) => {
  const router = useRouter();
  const { category_type, searchValue, page } = router?.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / itemsPerPage);

  const onPageChange = (event: { selected: number }) => {
    router.push({
      pathname: router.pathname,
      query: {
        category_type: category_type,
        searchValue: searchValue,
        page: event.selected + 1,
      },
    });
  };

  return <PaginationBase pageCount={pageCount} forcePage={forcePage} onPageChange={onPageChange} />;
};

export default CommunitySearchBoardPagination;
