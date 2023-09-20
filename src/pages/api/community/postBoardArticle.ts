import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardIndex, boardLang, lang } = req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await axios.post(
      'https://napi.appphotocard.com/v2/boards/posts',
      {
        identity: userId,
        board_idx: boardIndex,
        lang: boardLang,
        app_lang: lang,
      },
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to initiate board article posting');
  }
};

export default handler;
