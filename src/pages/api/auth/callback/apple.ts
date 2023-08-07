import { NextApiHandler } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';
import { serialize } from 'cookie';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.body.code;
  const nextUrl = (req.body.state as string).replaceAll(';', '&');

  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers['accept-language'] },
  });
  const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';
  const backResponse = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/apple',
    {
      platform: 'web',
      code: authorizationCode,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  const results = backResponse.data.RESULTS;
  if (results.MSG === 'success') {
    res.setHeader('set-cookie', [
      serialize('user_id', results.DATAS.USER_IDENTITY, { path: '/' }),
      serialize('onboarding', results.DATAS.ONBOARDING_FIN_YN, { path: '/' }),
    ]);
  }
  res.redirect(302, nextUrl);
};

export default appleLoginHandler;
