import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { commentIndex } = req.query;
    const { identity } = req.body;
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/likes/comment/${commentIndex}`,
        data: {
          identity: identity,
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
    const { commentIndex } = req.query;
    const { user_id } = req.cookies;
    try {
      const result = await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/likes/comment/${commentIndex}`,
        data: {
          identity: user_id,
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
