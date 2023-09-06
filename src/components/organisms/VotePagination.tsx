import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import PaginationBase from '../molecules/PaginationBase';
import { GetLanguage, GetRouterLanguage } from '@/hooks/useLanguage';

export interface VotePaginationProps {
  totalCount: number;
  itemsPerPage: number;
  isMobile: boolean;
}

const VotePagination = ({ totalCount, itemsPerPage, isMobile }: VotePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const language = GetLanguage();
  const routerLang = GetRouterLanguage();
  const { vote_type, page, per_page, lang } = router.query;
  const forcePage = Number(page) || 1;
  let pageCount = Math.ceil(totalCount / itemsPerPage);

  const onPageChange = (event: { selected: number }) => {
    router.push({
      pathname: pathname,
      query: {
        vote_type: vote_type,
        page: event.selected + 1,
        per_page: itemsPerPage,
        lang: lang || routerLang,
      },
    });
  };

  return <PaginationBase pageCount={pageCount} forcePage={forcePage} onPageChange={onPageChange} />;
};

export default VotePagination;
