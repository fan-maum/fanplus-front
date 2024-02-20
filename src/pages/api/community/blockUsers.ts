import type { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { blockUserListType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { userId, user_idx, position, count } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<blockUserListType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/${user_idx}/blockUsers`,
      {
        params: {
          identity: userId,
          position,
          count,
        },
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load block-users data');
  }
};

export default handler;
