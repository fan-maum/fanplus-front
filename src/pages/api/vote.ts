import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';

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
          Origin: 'http://vote.appphotocard.com',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to vote');
  }
};

export default handler;
