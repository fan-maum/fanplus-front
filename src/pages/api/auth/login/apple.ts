import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    res
      .status(200)
      .json(
        'https://appleid.apple.com/auth/authorize?' +
          `client_id=com.photocard.master.auth` +
          `&redirect_uri=https://fanplus-front-git-fanmaum-front.vercel.app/api/auth/callback/apple` +
          '&response_type=code' +
          '&scope=name%20email' +
          '&response_mode=form_post' +
          `&state=${req.body.data}`
      );
  }
};

export default handler;
