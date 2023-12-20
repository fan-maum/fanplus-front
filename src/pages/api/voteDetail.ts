import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vote_IDX = String(req.query.vote_idx) || '';
    const lang = String(req.query.lang);
    const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

    const response: AxiosResponse<{
      RESULTS: {
        ERROR: number;
        MSG: string;
        DATAS: object;
        TIMESTAMP: number;
      };
    }> = await axios.get(`https://napi.appphotocard.com/voteWeb/${vote_IDX}?lang=${lang}`, {
      headers: {
        Origin: origin,
        'Cache-Control': 'no-cache',
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
