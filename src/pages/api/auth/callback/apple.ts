import { NextApiHandler } from 'next';
import axios from 'axios';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');
  let user_lang = nextUrl.split('/')[3];
  if (user_lang === 'in') user_lang = 'id';
  else if (user_lang === 'zh-CN') user_lang = 'zh';
  else if (user_lang === 'zh-TW') user_lang = 'zhtw';

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
  console.log(result.data);

  // console.log(authorizationCode);
  // console.log(nextUrl);

  // console.log(userInfo.data);
  // res.setHeader("Set-Cookie", `USER_INFO=${userInfo.data}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
  // res.redirect("/");
};

export default appleLoginHandler;
