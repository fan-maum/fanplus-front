import { NextApiHandler } from 'next';
import axios from 'axios';

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');

  const googleResponse = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      code: authorizationCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const id_token = googleResponse.data.id_token;

  const backResponse = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/google',
    {
      platform: 'web',
      id_token: id_token,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: 'ko',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const results = backResponse.data.RESULTS;
  if (results.MSG === 'success') {
    res.setHeader(`Set-Cookie`, `user_id=${results.DATA.USER_IDENTITY}; Path=/; HttpOnly`);
    res.setHeader('Set-Cookie', `onboarding=${results.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`);
  }
  res.redirect(nextUrl);
};

export default googleLoginHandler;
