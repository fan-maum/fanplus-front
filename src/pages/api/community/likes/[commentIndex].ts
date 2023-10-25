import { APIServer } from '@/api/Instance';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { commentIndex } = req.query;
    const { identity } = req.body;
    try {
      const result = await APIServer.post(
        `/v1/likes/comment/${commentIndex}`,
        { identity },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }

  if (req.method === 'DELETE') {
    const { commentIndex, identity } = req.query;
    try {
      const result = await APIServer.delete(`/v1/likes/comment/${commentIndex}`, {
        data: { identity },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }
};

export default handler;
