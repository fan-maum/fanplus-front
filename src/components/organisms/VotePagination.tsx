import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import PaginationBase from '../molecules/PaginationBase';
import { useUrlLanguage, urlLangToBackLang } from '@/hooks/useLanguage';

export interface VotePaginationProps {
  totalCount: number;
  itemsPerPage: number;
  isMobile: boolean;
}

const VotePagination = ({ totalCount, itemsPerPage, isMobile }: VotePaginationProps) => {
  const router = useRouter();
  const { vote_type, page, per_page, locale } = router.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / itemsPerPage);

  const onPageChange = (event: { selected: number }) => {
    router.push({
      pathname: router.pathname,
      query: {
        vote_type: vote_type,
        page: event.selected + 1,
        per_page: itemsPerPage,
        locale: locale,
      },
    });
  };

  return <PaginationBase pageCount={pageCount} forcePage={forcePage} onPageChange={onPageChange} />;
};

export default VotePagination;
