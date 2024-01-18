import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { PostResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, postIndex, identity, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const url = `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail`;

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
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(error));
    throw error;
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
