import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardTopicResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardTopicResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/boards/${boardIndex}/topics?lang=${lang}`,
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
