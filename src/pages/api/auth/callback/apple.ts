import { NextApiHandler } from 'next';
import axios from 'axios';
import Negotiator from 'negotiator';
import { SUPPORT_LANGUAGE } from '@/middleware';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.body.code;
  const nextUrl = (req.body.state as string).replaceAll(';', '&');

  // const negotiator = new Negotiator({
  //   headers: { 'accept-language': req.headers['accept-language'] },
  // });
  // const user_lang = negotiator.language(SUPPORT_LANGUAGE) || 'en';
  // const backResponse = await axios.post(
  //   'https://napi.appphotocard.com/voteWeb/auth/apple',
  //   {
  //     platform: 'web',
  //     code: authorizationCode,
  //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     user_lang: user_lang,
  //   },
  //   { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  // );

  // const results = backResponse.data.RESULTS;
  // if (results.MSG === 'success') {
  //   res.setHeader(`Set-Cookie`, `user_id=${results.DATAS.USER_IDENTITY}; Path=/; HttpOnly`);
  //   res.setHeader('Set-Cookie', `onboarding=${results.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`);
  // }
  res.setHeader('Set-Cookie', `auth_code=${authorizationCode}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
};

export default appleLoginHandler;
