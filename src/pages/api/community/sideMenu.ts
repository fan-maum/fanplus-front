import type { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import type { sideMenuResponseType } from '@/types/community';

const handler: NextApiHandler = async (req, res) => {
  const { lang, identity } = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const params = !identity ? { lang } : { lang, identity };

  try {
    const response: AxiosResponse<sideMenuResponseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/menus/side`,
      {
        params,
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('Failed to load Community Main Layout Sidebar data');
  }
};

export default handler;
