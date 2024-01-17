import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { identity, menuId } = req.body;
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/bookmark`,
        data: {
          identity,
          menuId,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }

  if (req.method === 'DELETE') {
    const { menuId } = req.query;
    const { user_id } = req.cookies;

    try {
      const result = await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/bookmark`,
        data: {
          identity: user_id,
          menuId,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }
};

export default handler;
