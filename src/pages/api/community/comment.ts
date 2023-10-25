import { APIServer } from '@/api/Instance';
import type { CommunityBoardResponseType } from '@/types/community';
import { AxiosResponse } from 'axios';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { postIndex, identity, lang, order_by, page } = req.query;
  const per_page = 20;

  const queries = { lang, order_by, page, per_page };
  const queriesWithUserId = { ...queries, identity };

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await APIServer.get(
      `/voteWeb/posts/${postIndex}/comments`,
      { params: identity ? queriesWithUserId : queries }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.json(error);
  }
};

export default handler;
