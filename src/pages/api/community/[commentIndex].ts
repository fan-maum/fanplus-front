import { NextResponse } from 'next/server'
 
// export async function POST() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   })
 
//   const data = await res.json()
 
//   return NextResponse.json(data)
// }

import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';

const handler: NextApiHandler = async (req, res) => {
  // const identity = req.query.userId || '';
  const {commentIndex} = req.query;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';
  const { identity } = req.body

  try {
    console.log(identity);
    console.log(commentIndex);
    const result = await axios({
      method: 'post',
      url: `https://napi.appphotocard.com/v1/likes/comment/${commentIndex}`,
      data: {
        identity: identity
      }
    });
    res.status(result.status).json(result.data)
  } catch (error) {
    res.status(error.status).json(error.response.data)
  }
};

export default handler;
