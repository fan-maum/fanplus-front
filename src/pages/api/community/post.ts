import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { PostResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { postIndex, identity } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<PostResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/posts/${postIndex}?identity=${identity ?? ''}`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response?.status as number).json(error);
    }
  }
};

export default handler;
