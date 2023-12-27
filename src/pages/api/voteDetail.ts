import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';

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
    res.status(200).json(response.data);
    res.end();
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response?.status as number).json(error.response?.data);
    }
  }

  // const response: AxiosResponse<{
  //   RESULTS: {
  //     ERROR: number;
  //     MSG: string;
  //     DATAS: object;
  //     TIMESTAMP: number;
  //   };
  // }> = await axios.get(`https://napi.appphotocard.com/voteWeb/${vote_IDX}?lang=${lang}`, {
  //   headers: {
  //     Origin: origin,
  //     'Cache-Control': 'no-cache',
  //   },
  // });
  // res.status(200).json(response.data);
}
