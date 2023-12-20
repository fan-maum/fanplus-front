import type { CommunityNoticeBannerResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { boardIndex, lang } = req.query;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityNoticeBannerResponseType> = await axios.get(
      `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/banners?lang=${lang}`,
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
