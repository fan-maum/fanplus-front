import type { Top50PopularBoardsResponseType } from '@/types/community';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<Top50PopularBoardsResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/top`,
      {
        params: {
          lang,
          takeCount: 50,
        },
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load Top 50 Popular Boards');
  }
};

export default handler;
