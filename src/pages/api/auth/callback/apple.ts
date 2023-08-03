import { NextApiHandler } from 'next';
import axios from 'axios';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  // eslint-disable-next-line no-console
  console.log(authorizationCode);

  const nextUrl = (req.query.state as string).replaceAll(';', '&');
  let user_lang = nextUrl.split('/')[3];
  if (user_lang === 'in') user_lang = 'id';
  else if (user_lang === 'zh-CN') user_lang = 'zh';
  else if (user_lang === 'zh-TW') user_lang = 'zhtw';
  // eslint-disable-next-line no-console
  console.log(nextUrl);
  const result = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/apple',
    {
      platform: 'web',
      code: authorizationCode,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_lang: user_lang,
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  // eslint-disable-next-line no-console
  console.log(result.data);
  if (result.data.RESULTS.MSG === 'success') {
    res.setHeader(`Set-Cookie`, `logined=yes; Path=/; HttpOnly`);
    res.setHeader(
      'Set-Cookie',
      `onboarded=${result.data.RESULTS.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`
    );
  }
  // eslint-disable-next-line no-console
  console.log('리디렉 직전ㄴ');

  // console.log(authorizationCode);
  // console.log(nextUrl);

  // console.log(userInfo.data);
  // res.setHeader("Set-Cookie", `USER_INFO=${userInfo.data}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
  // res.redirect("/");
};

export default appleLoginHandler;
