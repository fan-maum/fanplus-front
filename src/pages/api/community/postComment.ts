import { NextApiHandler } from 'next';
import axios from 'axios';

const handler: NextApiHandler = async (
  identity: string,
  target_type: string,
  target: string,
  contents: string | number
) => {
  try {
    const response = await axios.post(`https://napi.appphotocard.com/v1/comments`, {
      identity: identity,
      target_type: target_type,
      target: target,
      contents: contents,
    });
    return response.data;
  } catch (error) {
    return 'Failed to load Community-Board data';
  }
};

export default handler;

import { NextResponse } from 'next/server'
 
export async function POST(identity: string,
  target_type: string,
  target: string,
  contents: string | number) {
  const res = await axios.post('https://napi.appphotocard.com/v1/comments', {
    body: JSON.stringify(
      identity: identity,
      target_type: target_type,
      target: target,
      contents: contents
      ),
  })
 
  const data = await res.data
 
  return NextResponse.json(data)
}