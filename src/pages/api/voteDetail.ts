import axios, { AxiosError, AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const vote_IDX = String(req.query.vote_idx) || '';
  const lang = String(req.query.lang);
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
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
    res.status(response.status).json(response.data);
    res.end();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error: voteDetailPage > getVoteDetail > voteDetail.ts
status code: ${error.response?.status}
parameters: { vote_IDX: ${vote_IDX}, lang: ${lang} }
response: `);
      console.error(error.response?.data);
      res.status(error.response?.status as number).json(error.response?.data);
    }
  }
}
