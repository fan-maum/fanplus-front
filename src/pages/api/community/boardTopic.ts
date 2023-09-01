import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardTopicResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardIndex } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardTopicResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/${boardIndex}/topics?identity=${userId}`,
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
