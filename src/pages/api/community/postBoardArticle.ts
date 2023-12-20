import type { PostBoardArticleResponseType } from '@/types/community';
import { publicEnv } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { userId, boardIndex, lang, topicIndex, title, contents, attachmentIds } = req.body;
  const origin = publicEnv.CLIENT_URL || 'https://dev.fanplus.co.kr';

  const baseBodyData = {
    identity: userId,
    lang: lang,
    app_lang: lang,
    topic_idx: topicIndex,
    title,
    contents,
  };

  const isAttatchments = attachmentIds.length !== 0;
  const finalBodyData = isAttatchments
    ? { ...baseBodyData, attachment_ids: attachmentIds.toString() }
    : baseBodyData;

  try {
    const response: AxiosResponse<PostBoardArticleResponseType> = await axios.post(
      `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}/posts/0`,
      finalBodyData,
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
    res.status(500).json('Failed to post board article');
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
