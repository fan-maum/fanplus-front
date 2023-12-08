import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { DailyVoteTicketResponse } from '@/types/vote';

const handler: NextApiHandler = async (req, res) => {
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  try {
    const response: AxiosResponse<DailyVoteTicketResponse> = await axios.get(
      'https://napi.appphotocard.com/v1/votes/ticket-count/web',
      {
        headers: {
          Origin: origin,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'failed to load get DailyVoteTicket data' });
  }
};

export default handler;
