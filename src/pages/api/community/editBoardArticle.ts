import type { EditBoardArticleResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { userId, postIndex, lang, title, contents, topicIndex } = req.body;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditBoardArticleResponseType> = await axios.put(
      'https://napi.appphotocard.com/v2/boards/posts',
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
