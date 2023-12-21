import type { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';

const handler: NextApiHandler = async (req, res) => {
  const userId = req.body?.userId;
  const userIndex = req.body?.userIndex;

  try {
    const response: AxiosResponse<{
      RESULTS: {
        ERROR: number;
        MSG: string;
        DATAS: object;
        TIMESTAMP: number;
      };
    }> = await axios.put(
      `https://napi.appphotocard.com/v1/users/${userIndex}`,
      {
        identity: userId,
        target: 'onboarding_finished_yn',
        value: 'Y',
      },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to signUp');
  }
};

export default handler;
