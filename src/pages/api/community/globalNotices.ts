import type { GlobalNoticesResponseType } from '@/types/community';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { userId, lang, boardLang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<GlobalNoticesResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/notice`,
      {
        params: {
          identity: userId,
          lang,
          filterLang: boardLang,
        },
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response?.status as number).json(error.response?.data);
    }
  }
};

export default handler;
