import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { EditBoardArticleResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, postIndex, lang, title, contents, topicIndex } = req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditBoardArticleResponseType> = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/boards/posts`,
      {
        identity: userId,
        post_idx: postIndex,
        lang: lang,
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
