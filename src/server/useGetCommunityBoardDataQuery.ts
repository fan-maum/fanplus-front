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
  lang,
  boardLang,
  topic,
  viewType,
  initialData,
}: useGetCommunityBoardDataQueryPropType) => {
  const response = useQuery({
    queryKey: ['communityBoardData'],
    queryFn: () =>
      getCommunityBoardData(userId, boardIndex, page, lang, boardLang, topic, viewType),
    initialData,
  });
  return response;
};
