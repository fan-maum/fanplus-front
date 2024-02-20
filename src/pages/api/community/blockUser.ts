import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { targetUserIdx } = req.body;
    const { user_id, user_idx } = req.cookies;
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/${user_idx}/blockUsers`,
        data: {
          identity: user_id,
          user_idx,
          targetUserIdx,
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
    const { targetUserIdx } = req.query;
    const { user_id, user_idx } = req.cookies;
    try {
      const result = await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/${user_idx}/blockUsers`,
        data: {
          identity: user_id,
          user_idx,
          targetUserIdx,
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
