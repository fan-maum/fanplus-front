import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { CommunityBoardResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, postIndex, boardLang, lang, title, contents, topicIndex } = req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityBoardResponseType> = await axios.put(
      'https://napi.appphotocard.com/v2/boards/posts',
      {
        identity: userId,
        post_idx: postIndex,
        lang: boardLang,
        app_lang: lang,
        title,
        contents,
        topic_idx: topicIndex,
        is_publish: 'Y',
      },
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to edit board article');
  }
};

export default handler;
