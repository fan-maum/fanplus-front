import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { target_type, target, contents } = req.body;
    const { user_id } = req.cookies;
    try {
      const result = await axios({
        method: 'post',
        url: `https://napi.appphotocard.com/v1/comments`,
        data: {
          identity: user_id,
          target_type: target_type,
          target: target,
          contents: contents,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }

  if (req.method === 'DELETE') {
    const { comment_idx } = req.body;
    const { user_id } = req.cookies;
    try {
      const result = await axios({
        method: 'delete',
        url: `https://napi.appphotocard.com/v1/comments`,
        data: {
          identity: user_id,
          comment_idx: comment_idx,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }
};

export default handler;
