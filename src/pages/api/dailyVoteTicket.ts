import type { NextApiRequest, NextApiResponse } from 'next';
import { getDailyVoteTicket } from '@/api/Vote';
import axios, { AxiosResponse } from 'axios';
import { DailyVoteTicketResponse } from '@/types/vote';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response: AxiosResponse<DailyVoteTicketResponse> = await axios.get(
      'https://napi.appphotocard.com/v1/votes/ticket-count/web'
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
