import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityNoticeBannerResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, lang } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityNoticeBannerResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/boards/${boardIndex}/banners?lang=${lang}`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(502).json('failed to load Notice Banner');
  }
};

export default handler;
