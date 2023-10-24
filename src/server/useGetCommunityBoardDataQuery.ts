import { getCommunityBoardData } from '@/api/Community';
import type { BoardLangType, ServerLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import { useQuery } from 'react-query';

export type useGetCommunityBoardDataQueryPropType = {
  userId: string;
  boardIndex: number;
  page: number;
  lang: ServerLangType;
  boardLang: BoardLangType;
  topic: number | '';
  viewType: string;
  initialData: CommunityBoardResponseType;
};

export const useGetCommunityBoardDataQuery = ({
  userId,
  boardIndex,
  page,
  lang: requestLang,
  boardLang,
  topic: topicIndex,
  viewType,
  initialData,
}: useGetCommunityBoardDataQueryPropType) => {
  return useQuery({
    queryKey: [
      'communityBoardData',
      { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType },
    ],
    queryFn: () =>
      getCommunityBoardData(userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType),
    initialData,
    suspense: true,
  });
};
