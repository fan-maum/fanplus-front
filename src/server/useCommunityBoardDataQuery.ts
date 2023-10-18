import { getCommunityBoardData } from '@/api/Community';
import type { BoardLangType, ServerLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import { useQuery } from 'react-query';

export const useCommunityBoardDataQuery = (
  userId: string,
  boardIndex: number,
  page: number,
  lang: ServerLangType,
  boardLang: BoardLangType,
  topic: number | '',
  view_type: string,
  initialData: CommunityBoardResponseType
) => {
  const response = useQuery({
    queryKey: ['communityBoardData'],
    queryFn: () =>
      getCommunityBoardData(userId, boardIndex, page, lang, boardLang, topic, view_type),
    initialData,
  });
  return response;
};
