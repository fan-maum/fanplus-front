import { NextApiHandler } from 'next';
import axios from 'axios';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');

  let user_lang = nextUrl.split('/')[3];
  if (user_lang === 'in') user_lang = 'id';
  else if (user_lang === 'zh-CN') user_lang = 'zh';
  else if (user_lang === 'zh-TW') user_lang = 'zhtw';

  // const result = await axios.post(
  //   'https://napi.appphotocard.com/voteWeb/auth/apple',
  //   {
  //     platform: 'web',
  //     code: authorizationCode,
  //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     user_lang: user_lang,
  //   },
  //   { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  // );

  // if (result.data.RESULTS.MSG === 'success') {
  //   res.setHeader(`Set-Cookie`, `logined=yes; Path=/; HttpOnly`);
  //   res.setHeader(
  //     'Set-Cookie',
  //     `onboarded=${result.data.RESULTS.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`
  //   );
  // }
  // res.redirect(nextUrl);
  res.redirect('https://fanplus-front-git-fanmaum-front.vercel.app');
};

export default appleLoginHandler;
