import type { Top30PopularBoardsResponseType } from '@/types/community';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<Top30PopularBoardsResponseType> = await axios.get(
      `https://napi.appphotocard.com/voteWeb/boards/top?lang=${lang}`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load Top 30 Popular Boards');
  }
};

export default handler;
