import { NextApiHandler, NextApiRequest } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';
import { serialize } from 'cookie';

const getIdTokenByCode = async (authorizationCode?: unknown) => {
  if (typeof authorizationCode !== 'string') {
    return;
  }
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

  return googleResponse.data.id_token;
};

const getAccessTokenByIdToken = async (req: NextApiRequest, idToken: string) => {
  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers['accept-language'] },
  });
  const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';

  const backResponse = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/google',
    {
      platform: 'android',
      id_token: idToken,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return backResponse.data.RESULTS;
};

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');

  const idToken = await getIdTokenByCode(authorizationCode);
  const results = await getAccessTokenByIdToken(req, idToken);
  console.log(results.DATAS);
  if (results.MSG === 'success') {
    res.setHeader('set-cookie', [
      serialize('user_id', results.DATAS.USER_IDENTITY, { path: '/' }),
      serialize('user_idx', results.DATAS.USER_IDX, { path: '/' }),
    ]);
    if (results.DATAS.ONBOARDING_FIN_YN === 'N') {
      res.redirect(`/signUp/?nextUrl=${nextUrl}`);
    }
  }

  res.redirect(302, nextUrl);
};

export default googleLoginHandler;
