import { NextApiHandler, NextApiRequest } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';
import { serialize } from 'cookie';

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state !== 'undefined' ? (req.query.state as string) : '/';
  const nextUrl = state.replaceAll(';', '&');

  if (!code || typeof code !== 'string') throw new Error('Bad Request');
  const idToken = await getIdTokenByCode(code);

  if (!idToken) throw new Error('Token Undfined');
  const results = await getResultsByIdToken(req, idToken);

  if (results.MSG === 'success') {
    res.setHeader('set-cookie', [
      serialize('user_id', results.DATAS.USER_IDENTITY, {
        path: '/',
        secure: true,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      }),
      serialize('user_idx', results.DATAS.USER_IDX, {
        path: '/',
        secure: true,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      }),
    ]);
    if (results.DATAS.ONBOARDING_FIN_YN === 'N') {
      res.redirect(`/signUp/?nextUrl=${state}`);
    } else {
      res.redirect(302, nextUrl);
    }
  } else {
    res.redirect(302, nextUrl);
  }
};

export default googleLoginHandler;

const getIdTokenByCode = async (code?: unknown) => {
  const googleResponse = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return googleResponse.data.id_token;
};

const getResultsByIdToken = async (req: NextApiRequest, idToken: string) => {
  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers['accept-language'] },
  });
  const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';

  const backResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/voteWeb/auth/google`,
    {
      platform: 'web',
      id_token: idToken,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return backResponse.data.RESULTS;
};
