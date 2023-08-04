import { NextApiHandler } from 'next';
import axios from 'axios';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.body.code;
  const nextUrl = req.body.state;

  // let user_lang = nextUrl.split('/')[3];
  // if (user_lang === 'in') user_lang = 'id';
  // else if (user_lang === 'zh-CN') user_lang = 'zh';
  // else if (user_lang === 'zh-TW') user_lang = 'zhtw';

  // const result = await axios.post(
  //   'https://napi.appphotocard.com/voteWeb/auth/apple',
  //   {
  //     platform: 'web',
  //     code: authorizationCode,
  //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     user_lang: 'ko',
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
  res.redirect(302, nextUrl);
};

export default appleLoginHandler;
