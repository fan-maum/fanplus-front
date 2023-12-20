import type { CommunityBoardResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { postIndex, identity, lang, order_by, page } = req.query;
  const per_page = 20;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';
  const unAuthUrl =
    `https://napi.appphotocard.com/voteWeb/posts/${postIndex}/comments?lang=${lang}` +
    `&order_by=${order_by}&page=${page}&per_page=${per_page}`;
  const authUrl =
    `https://napi.appphotocard.com/voteWeb/posts/${postIndex}/comments?identity=${identity}&lang=${lang}` +
    `&order_by=${order_by}&page=${page}&per_page=${per_page}`;
  const isIdentityUrl = identity === undefined ? unAuthUrl : authUrl;

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await axios.get(isIdentityUrl, {
      headers: {
        Origin: origin,
        'Cache-Control': 'no-cache',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load Community-Board data');
  }
};

export default handler;
