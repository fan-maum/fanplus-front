import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import { EditorImageUrlResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, postIndex, fileName, fileType, uploadKey } = req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditorImageUrlResponseType> = await axios.post(
      'https://napi.appphotocard.com/voteWeb/imgs',
      {
        identity: userId,
        post_idx: postIndex,
        origin_name: fileName,
        file_ext: fileType,
        upload_key: uploadKey,
      },
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
          'Content-Type': 'form-data',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to edit board article');
  }
};

export default handler;
