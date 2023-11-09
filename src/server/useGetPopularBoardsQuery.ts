import { getTop30PopularBoards } from '@/api/Community';
import type { ServerLangType } from '@/types/common';
import { useQuery } from 'react-query';

export const useGetPopularBoardsQuery = (serverLang: ServerLangType) => {
  return useQuery({
    queryKey: 'Top30 Popular Boards',
    queryFn: () => getTop30PopularBoards(serverLang),
    staleTime: 1000 * 60 * 15,
    cacheTime: 100 * 60 * 30,
  });
};
