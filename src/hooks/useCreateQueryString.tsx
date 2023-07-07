import { useSearchParams } from 'react-router-dom';

export const useCreateQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const voteType = searchParams.get('vote_type');
  const pageNumber = searchParams.get('page');
  const perPage = searchParams.get('per_page');
  setSearchParams(searchParams);
};
