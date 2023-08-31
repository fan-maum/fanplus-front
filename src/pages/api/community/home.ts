import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityHomeResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const identity = req.query.userId || '';
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityHomeResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/boards?identity=${identity}&view_type=all&app_version=1.27.24`,
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
