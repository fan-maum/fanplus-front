import type { BestPostsResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { lang, viewType } = req.query;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<BestPostsResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/best/posts`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
        params: {
          view_type: viewType,
          lang,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load Best Posts');
  }
};

export default handler;
