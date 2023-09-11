import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (contents) => {
  const { target_type, target, order_by, board_lang, lang, page } = req.query;
  const identity = '8d11881894651bcd2467d8cf5a1377e00e9eb9e5f3546c75bf9bd36c8b588d04';

  try {
    const response = await axios.post(`https://napi.appphotocard.com/v1/comments`, {
      identity: identity,
      target_type: target_type,
      target: target,
      contents: contents,
    });
    return response.data;
  } catch (error) {
    return 'Failed to load Community-Board data';
  }
};

export default handler;
