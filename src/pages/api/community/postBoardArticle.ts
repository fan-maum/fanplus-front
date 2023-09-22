import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { PostBoardArticleResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardIndex, boardLang, lang, topicIndex, title, contents, attachmentIds } =
    req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<PostBoardArticleResponseType> = await axios.post(
      `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/posts/0`,
      {
        identity: userId,
        lang: boardLang,
        app_lang: lang,
        topic_idx: topicIndex,
        title,
        contents,
        attachment_ids: attachmentIds.toString(),
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
    res.status(500).json('Failed to initiate board article posting');
  }
};

export default handler;
