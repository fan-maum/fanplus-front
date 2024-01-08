import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  const { page, per_page } = req.query;
  const { post_idx, mode, report_type } = req.body;
  const { user_id } = req.cookies;
  try {
    const result = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/reports/posts?identity=${user_id}&page=${page}&per_page=${per_page}`,
      data: {
        identity: user_id,
        post_idx: post_idx,
        mode: mode,
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
