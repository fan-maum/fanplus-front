import type { EditorImageUrlResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditorImageUrlResponseType> = await axios.get(
      'https://napi.appphotocard.com/voteWeb/imgs',
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to edit board article');
  }
};

export default handler;
