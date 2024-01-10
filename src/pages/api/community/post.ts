import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { PostResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, postIndex, identity, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail`;

  try {
    const response: AxiosResponse<PostResponseType> = await axios.get(url, {
      headers: {
        Origin: origin,
        'Cache-Control': 'no-cache',
      },
      params: identity !== undefined ? { identity, lang } : { lang },
    });
    res.status(200).json(response.data);
  } catch (error) {
    JSON.stringify(error);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
