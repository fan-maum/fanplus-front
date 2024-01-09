import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { BookmarksResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { identity, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<BookmarksResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/bookmark?identity=${identity}&lang=${lang}`,
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
      res.status(500).json('Failed to load bookmarks data');
    }
  }
};

export default handler;
