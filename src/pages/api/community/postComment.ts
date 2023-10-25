import { APIServer } from '@/api/Instance';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { identity, target_type, target, contents } = req.body;
    try {
      const result = await APIServer.post(
        `/v1/comments`,
        { identity, target_type, target, contents },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }

  if (req.method === 'DELETE') {
    const { comment_idx, identity } = req.query;
    try {
      const result = await APIServer.delete(`/v1/comments`, {
        data: { identity, comment_idx },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }
};

export default handler;
