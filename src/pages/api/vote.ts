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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/${voteId}`,
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
      // eslint-disable-next-line no-console
      console.error(
        `Error: vote API 
vote_id: ${voteId}, 
identity: ${userId}, 
target_star_idx: ${starId}, 
response_error_code: ${error.response?.data.RESULTS.ERROR}, 
response_error_msg: ${error.response?.data.RESULTS.MSG}`
      );
      res.status(500).json(error.response?.data);
    }
  }
};

export default handler;
