import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardCategoryResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { category_type, searchValue, page } = req.query;
  const userId = req.query.userId || '';
  const per_page = 20;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardCategoryResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/search/boards?identity=${userId}` +
        `&category_type=${category_type}&search_val=${searchValue}&page=${page}&per_page=${per_page}`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load data');
  }
};

export default handler;
