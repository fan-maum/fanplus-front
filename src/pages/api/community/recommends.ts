import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    // @ts-ignore
    console.log(req.body);
    const { identity, post_idx } = req.body;
    try {
      const result = await axios({
        method: 'post',
        url: `https://napi.appphotocard.com/v1/recommends/posts`,
        data: {
          identity: identity,
          post_idx: post_idx,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result.data);
      res.status(200).json(result.data);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
  if (req.method === 'DELETE') {
    const { user_id } = req.cookies;
    const { post_idx } = req.query;
    const url = `https://napi.appphotocard.com/v1/recommends/posts`;
    try {
      const result = await axios.delete(url, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          identity: user_id,
          post_idx: post_idx,
        },
      });
      // });
      res.status(200).json(result.data);
    } catch (error) {
      res.json(error);
    }
  }
};

export default handler;
