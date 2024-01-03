import { getGlobalNotices } from '@/api/Community';
import { useQuery } from 'react-query';

export const useGetGlobalNoticesQuery = (collectionId: number) => {
  return useQuery({
    queryKey: 'GlobalNotices' + collectionId,
    queryFn: () => getGlobalNotices(collectionId),
    staleTime: 1000 * 60 * 15,
    cacheTime: 100 * 60 * 30,
  });
};
