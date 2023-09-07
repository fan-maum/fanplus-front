// import { NextApiHandler } from 'next';
// import axios, { AxiosResponse } from 'axios';
// import type { CommunityHomeResponseTypeWithoutUserId } from '@/types/community';

// const handler: NextApiHandler = async (req, res) => {
//   const lang = req.query.lang;
//   const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

//   try {
//     const response: AxiosResponse<CommunityHomeResponseTypeWithoutUserId> = await axios.get(
//       `https://napi.appphotocard.com/voteWeb/boards/0?lang=${lang}`,
//       {
//         headers: {
//           Origin: origin,
//           'Cache-Control': 'no-cache',
//         },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json('failed to load data');
//   }
// };

// export default handler;
