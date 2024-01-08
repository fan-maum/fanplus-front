import type { MainPageNoticesResponseType } from '@/types/community';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { collectionId } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<MainPageNoticesResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/collection/${collectionId}`,
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
      console.error(error.response?.data); // eslint-disable-line
      res.status(error.response?.status as number).json(error.response?.data);
    }
  }
};

export default handler;
