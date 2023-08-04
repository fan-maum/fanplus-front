import { NextApiHandler } from 'next';
import axios from 'axios';

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');

  const response = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      code: authorizationCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const id_token = response.data.id_token;

  // 만약 오류가 난다면 아마 ko 때문일 것. (나중에 develop이랑 머지하면 해결될 문제임!)
  const result = await axios.post(
    'https://napi.appphotocard.com/voteWeb/auth/google',
    {
      platform: 'web',
      id_token: id_token,
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
  res.redirect(nextUrl);
};

export default googleLoginHandler;
