import type { CommunityBoardCategoryResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { lang } = req.query;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardCategoryResponseType> = await axios.get(
      `https://napi.appphotocard.com/voteWeb/search/category?page=&per_page=&lang=${lang}`,
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
