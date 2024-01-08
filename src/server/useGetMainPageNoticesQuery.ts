import { getMainPageNotices } from '@/api/Community';
import { useQuery } from 'react-query';

export const useGetMainPageNoticesQuery = (collectionId: number) => {
  return useQuery({
    queryKey: 'GlobalNotices' + collectionId,
    queryFn: () => getMainPageNotices(collectionId),
    staleTime: 1000 * 60 * 15,
    cacheTime: 100 * 60 * 30,
  });
};
