import type { UserResponseType } from '@/types/community';
import axios, { AxiosResponse } from 'axios';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { user_idx, identity } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<UserResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/${user_idx}?identity=${identity}`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load User Data at getUser() of /api/community/user.ts');
  }
};

export default handler;
