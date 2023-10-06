import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { PostResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, postIndex, identity, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const unAuthUrl = `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail?lang=${lang}`;
  const authUrl = `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail?identity=${identity}&lang=${lang}`;
  const isIdentityUrl = identity === undefined ? unAuthUrl : authUrl;

  try {
    const response: AxiosResponse<PostResponseType> = await axios.get(isIdentityUrl, {
      headers: {
        Origin: origin,
        'Cache-Control': 'no-cache',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(error.response?.status as number).json(error);
    }
  }
};

export default handler;
