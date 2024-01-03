import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { post_idx, mode } = req.query;
    const { user_id } = req.cookies;

    try {
      const result = await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/boards/posts?identity=${user_id}`,
        data: {
          identity: user_id,
          post_idx: post_idx,
          mode: mode,
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
