import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import { EditorImageUrlResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditorImageUrlResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/imgs`,
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
