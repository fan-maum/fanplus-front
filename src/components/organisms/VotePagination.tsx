import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import PcVotePagination from './PcVotePagination';

export interface VotePaginationProps {
  totalCount: number;
  itemsPerPage: number;
  isMobile: boolean;
}

const VotePagination = ({ totalCount, itemsPerPage, isMobile }: VotePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { vote_type, page, per_page } = router.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / itemsPerPage);

  const onPageChange = (event: { selected: number }) => {
    router.push({
      pathname: pathname,
      query: {
        vote_type: vote_type,
        page: event.selected + 1,
        per_page: itemsPerPage,
      },
    });
  };

  return (
    <PcVotePagination pageCount={pageCount} forcePage={forcePage} onPageChange={onPageChange} />
  );
  // return !isMobile ? (
  //   <PcVotePagination pageCount={pageCount} onPageChange={onPageChange} />
  // ) : (
  //   <MobileVotePagination pageCount={pageCount} onPageChange={onPageChange} />
  // );
};

export default VotePagination;
