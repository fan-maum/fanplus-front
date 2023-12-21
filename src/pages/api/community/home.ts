import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { userId, lang, viewType } = req.query;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse = await axios.get(
      `https://napi.appphotocard.com/voteWeb/boards2/${viewType}?lang=${lang}` +
        (userId && `&identity=${userId}`),
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load boardList');
  }
};

export default handler;
