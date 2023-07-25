import type { NextApiRequest, NextApiResponse } from 'next';
import { getVoteDetail } from '@/api/Vote';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   try {
  //     const vote_IDX = String(req.query.vote_IDX) || '';
  //     const lang = String(req.query.lang);
  //     const response = await getVoteDetail(vote_IDX, lang);
  //     const result = await response.json();
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).json({ error: 'failed to load data' });
  //   }
}
