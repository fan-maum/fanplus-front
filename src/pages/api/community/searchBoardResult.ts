import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardResultResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { category_type, searchValue, lang, page } = req.query;
  const per_page = 20;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardResultResponseType> = await axios.get(
      `https://napi.appphotocard.com/voteWeb/search/board?category_type=${category_type}` +
        `&search_val=${searchValue}&lang=${lang}&page=${page}&per_page=${per_page}`,
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
