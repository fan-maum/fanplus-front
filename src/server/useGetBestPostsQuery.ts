import { getBestPosts } from '@/api/Community';
import type { BestPostsViewType } from '@/components/molecules/community/BestNotices';
import type { ServerLangType } from '@/types/common';
import { useQuery } from 'react-query';

export const useGetBestPostsQuery = (serverLang: ServerLangType, viewType: BestPostsViewType) => {
  return useQuery({
    queryKey: 'BestPosts' + serverLang + viewType,
    queryFn: () => getBestPosts(serverLang, viewType),
    staleTime: 1000 * 60 * 15,
    cacheTime: 100 * 60 * 30,
  });
};
