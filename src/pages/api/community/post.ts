import type { PostResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, postIndex, identity, lang } = req.query;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';
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
    JSON.stringify(error);
    // if (error instanceof AxiosError) {
    //   res.status(error.response?.status as number).json(error);
    // }
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
