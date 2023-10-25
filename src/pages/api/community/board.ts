import { APIServer } from '@/api/Instance';
import type { CommunityBoardResponseType } from '@/types/community';
import type { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardIndex, page, lang, filter_lang, view_type, topic } = req.query;

  const queries = { page, per_page: 20, lang, filter_lang, view_type, 'topic_ids[]': topic };
  const queriesWithUserId = { ...queries, userId };

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await APIServer.get(
      `/voteWeb/boards/${boardIndex}/posts?`,
      { params: userId ? queriesWithUserId : queries }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.json(error);
  }
};

export default handler;
