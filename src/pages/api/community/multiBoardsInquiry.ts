import type { MultiBoardsInquiryResponseType } from '@/types/community';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { boardIds, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const params = { 'boardIds[]': boardIds, lang };

  try {
    const response: AxiosResponse<MultiBoardsInquiryResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/boards`,
      {
        params,
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
