import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    res
      .status(200)
      .json(
        'https://appleid.apple.com/auth/authorize?' +
          `client_id=${process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}` +
          `&redirect_uri=${process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}` +
          '&response_type=code' +
          '&scope=name%20email' +
          '&response_mode=form_post' +
          `&state=${req.body.data}`
      );
  }
};

export default handler;
