import { APIServer } from '@/api/Instance';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { identity, post_idx, mode } = req.query;

  try {
    const result = await APIServer.delete(`/v1/boards/posts`, {
      data: { identity, post_idx, mode },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    res.status(200).json(result.data);
  } catch (error) {
    res.json(error);
  }
};

export default handler;
