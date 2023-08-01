import { NextApiHandler } from 'next';
import axios from 'axios';

const appleLoginHandler: NextApiHandler = async (req, res) => {
  const authorizationCode = req.query.code;
  const nextUrl = (req.query.state as string).replaceAll(';', '&');
  console.log(authorizationCode);
  console.log(nextUrl);

  // console.log(userInfo.data);
  // res.setHeader("Set-Cookie", `USER_INFO=${userInfo.data}; Path=/; HttpOnly`);
  res.redirect(nextUrl);
  // res.redirect("/");
};

export default appleLoginHandler;
