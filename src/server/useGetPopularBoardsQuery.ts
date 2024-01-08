import { getTop50PopularBoards } from '@/api/Community';
import type { ServerLangType } from '@/types/common';
import { useQuery } from 'react-query';

export const useGetPopularBoardsQuery = (serverLang: ServerLangType) => {
  return useQuery({
    queryKey: 'Top50 Popular Boards ' + serverLang,
    queryFn: () => getTop50PopularBoards(serverLang),
    staleTime: 1000 * 60 * 15,
    cacheTime: 100 * 60 * 30,
  });
};
