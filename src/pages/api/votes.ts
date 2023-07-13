// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getVotes } from '@/api/Vote';

async function test(vote_type, page, per_page) {
  const initialRowData = await getVotes(vote_type, page, per_page);
  const initialData = await initialRowData.json();
  return initialData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vote_type = req.query.vote_type || '';
    const page = req.query.page || 0;
    const per_page = req.query.per_page;
    const result = await test(vote_type, page, per_page);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
