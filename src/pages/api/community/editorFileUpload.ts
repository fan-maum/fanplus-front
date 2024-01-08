import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import { EditorImageUploadResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, fileName, fileType, uploadKey, postIndex } = req.body;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<EditorImageUploadResponseType> = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/imgs`,
      {
        identity: userId,
        origin_name: fileName,
        file_ext: fileType,
        upload_key: uploadKey,
        post_idx: postIndex || 0,
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
    res.status(500).json('Failed to edit board article');
  }
};

export default handler;
