import { NextApiHandler } from 'next';
import axios from 'axios';
import type { availLang } from './google';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.body.code;

  const nextUrl = (req.body.state as string).replaceAll(';', '&');
  const langTranslate = {
    ko: 'ko',
    en: 'en',
    es: 'es',
    in: 'id',
    ja: 'ja',
    vi: 'vi',
    'zh-CN': 'zh',
    'zh-TW': 'zhtw',
  };
  const user_lang = langTranslate[nextUrl.split('/')[3] as availLang] || 'en';

  const result = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/apple',
    {
      platform: 'web',
      code: authorizationCode,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: 'ko',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  if (result.data.RESULTS.MSG === 'success') {
    res.setHeader(`Set-Cookie`, `logined=yes; Path=/; HttpOnly`);
    res.setHeader(
      'Set-Cookie',
      `onboarded=${result.data.RESULTS.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`
    );
  }
  res.redirect(302, nextUrl);
};

export default appleLoginHandler;
