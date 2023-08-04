import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const nextUrl = req.query.nextUrl || '/';
  const domain = 'https://fanplus-front-git-fanmaum-front.vercel.app';

  res.redirect(
    'https://appleid.apple.com/auth/authorize?' +
      `client_id=com.photocard.master.auth` +
      `&redirect_uri=${domain}/api/auth/callback/apple/` +
      '&response_type=code' +
      '&scope=name%20email' +
      '&response_mode=form_post' +
      `&state=${nextUrl}`
  );
};

export default handler;
