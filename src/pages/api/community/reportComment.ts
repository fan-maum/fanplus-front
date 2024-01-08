import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  const { comment_idx, report_type } = req.body;
  const { user_id } = req.cookies;
  try {
    const result = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/reports/comments`,
      data: {
        identity: user_id,
        comment_idx: comment_idx,
        report_type: report_type,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    res.status(200).json(result.data);
  } catch (error) {
    res.json(error);
  }
};

export default handler;
