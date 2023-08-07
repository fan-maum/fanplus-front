import { NextApiHandler } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';
import { serialize } from 'cookie';

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
  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers['accept-language'] },
  });
  const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';
  const backResponse = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/google',
    {
      platform: 'web',
      id_token: id_token,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const results = backResponse.data.RESULTS;
  if (results.MSG === 'success') {
    console.log(results.DATAS.USER_IDENTITY);
    res.setHeader('set-cookie', [
      serialize('user_id', results.DATAS.USER_IDENTITY, { path: '/' }),
      serialize('onboarding', results.DATAS.ONBOARDING_FIN_YN, { path: '/' }),
    ]);
  }
  res.redirect(nextUrl);
};

export default googleLoginHandler;
