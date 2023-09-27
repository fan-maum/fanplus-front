import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { commentIndex, identity, board_lang, order_by } = req.query;
  const page = 0;
  const per_page = 20;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  const unAuthUrl =
    `https://napi.appphotocard.com/voteWeb/comments/${commentIndex}/subComments?lang=${board_lang}` +
    `&order_by=${order_by}&page=${page}&per_page=${per_page}`;
  const authUrl =
    `https://napi.appphotocard.com/voteWeb/comments/${commentIndex}/subComments?identity=${identity}&lang=${board_lang}` +
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
