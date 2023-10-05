import { NextApiHandler } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';

const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

const handler: NextApiHandler = async (req, res) => {
  const voteId = req.body?.voteId;
  const userId = req.body?.userId;
  const starId = req.body?.starId;

  try {
    const response: AxiosResponse<{
      RESULTS: {
        ERROR: number;
        MSG: string;
        DATAS: object;
        TIMESTAMP: number;
      };
    }> = await axios.post(
      `https://napi.appphotocard.com/voteWeb/${voteId}`,
      { identity: userId, target_star_idx: starId },
      {
        headers: {
          Origin: origin,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(500).json(error.response?.data);
    }
  }
};

export default handler;
