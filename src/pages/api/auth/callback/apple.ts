import { NextApiHandler, NextApiRequest } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';
import { serialize } from 'cookie';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const code = req.body.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');

  if (!code || typeof code !== 'string') throw new Error('Bad Request');
  console.log(code);
  // const results = await getResultsByCode(req, code);

  // if (results.MSG === 'success') {
  //   res.setHeader('set-cookie', [
  //     serialize('user_id', results.DATAS.USER_IDENTITY, {
  //       path: '/',
  //       secure: true,
  //       domain: process.env.COOKIE_DOMAIN || 'localhost',
  //     }),
  //     serialize('user_idx', results.DATAS.USER_IDX, {
  //       path: '/',
  //       secure: true,
  //       domain: process.env.COOKIE_DOMAIN || 'localhost',
  //     }),
  //   ]);
  //   if (results.DATAS.ONBOARDING_FIN_YN === 'N') {
  //     res.redirect(`/signUp/?nextUrl=${nextUrl}`);
  //   }
  // }
  res.redirect(302, nextUrl);
};

export default appleLoginHandler;

const getResultsByCode = async (req: NextApiRequest, code: string) => {
  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers['accept-language'] },
  });
  const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';

  const backResponse = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/google',
    {
      platform: 'web',
      code: code,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return backResponse.data.RESULTS;
};
