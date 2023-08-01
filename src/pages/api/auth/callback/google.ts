import { NextApiHandler } from 'next';
import axios from 'axios';

const googleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');
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
  const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  res.setHeader('Set-Cookie', `USER_INFO=${userInfo.data}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
};

export default googleLoginHandler;
