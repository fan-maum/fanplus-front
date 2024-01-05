import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { identity, boardIdx } = req.body;
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/bookmark`,
        data: {
          identity: identity,
          boardIdx: boardIdx,
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
    const { board_idx } = req.query;
    const { user_id } = req.cookies;

    try {
      const result = await axios({
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/boards/bookmark`,
        data: {
          identity: user_id,
          boardIdx: board_idx,
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
