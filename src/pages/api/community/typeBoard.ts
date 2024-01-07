import type { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardType, page, maxPage, lang, boardLang, viewType } = req.query;
  console.log('boardType', boardType);

  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${boardType}`,
      {
        params: {
          identity: userId,
          lang,
          filterLang: boardLang,
          maxPage,
          page,
          perPage: 20,
          viewType,
        },
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load Community-Board data');
  }
};

export default handler;
