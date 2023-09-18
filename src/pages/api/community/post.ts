import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityPostResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { postIndex, identity } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityPostResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/posts/${postIndex}?identity=${identity}&page=0&per_page=10&referer=newest`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load Community-Board data');
  }
};

export default handler;
