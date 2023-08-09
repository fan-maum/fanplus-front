import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const nextUrl = req.query.nextUrl || '/';

  res.redirect(
    'https://appleid.apple.com/auth/authorize?' +
      `client_id=${process.env.APPLE_CLIENT_ID}` +
      `&redirect_uri=${process.env.APPLE_REDIRECT_URI}/` +
      '&response_type=code' +
      '&scope=name%20email' +
      '&response_mode=form_post' +
      `&state=${nextUrl}`
  );
};

export default handler;
