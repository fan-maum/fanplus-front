import { NextApiHandler } from 'next';
import axios from 'axios';

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');
  let user_lang = nextUrl.split('/')[3];
  if (user_lang === 'in') user_lang = 'id';
  else if (user_lang === 'zh-CN') user_lang = 'zh';
  else if (user_lang === 'zh-TW') user_lang = 'zhtw';
  const response = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      code: authorizationCode,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const accessToken = response.data.access_token;
  // const id_token = response.data.id_token;
  const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  // const result = await axios.post('https://napi.appphotocard.com/voteWeb/auth/google', {
  //   platform: 'web',
  //   id_token: id_token,
  //   timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   user_lang: user_lang,
  // });
  // if (result.data.MSG === 'success') {
  //   res.setHeader(
  //     'Set-Cookie',
  //     `onboarded=${result.data.DATAS.ONBOARDING_FIN_YN}; Path=/; HttpOnly`
  //   );

  // }
  res.setHeader('Set-Cookie', `USER_INFO=${userInfo.data}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
};

export default googleLoginHandler;
