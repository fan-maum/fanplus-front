import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const nextUrl = req.query.nextUrl || '/';

  res.redirect(
    'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
      '&response_type=code' +
      '&scope=openid%20email%20profile' +
      `&state=${nextUrl}`
  );
};

export default handler;
