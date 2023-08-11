// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getVotes } from '@/api/Vote';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vote_type = String(req.query.vote_type) || '';
    const page = Number(req.query.page) || 0;
    const per_page = Number(req.query.per_page);
    const lang = String(req.query.lang);
    const response = await getVotes(vote_type, page, per_page, lang);
    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
