// import { NextApiHandler } from 'next';
// import axios, { AxiosResponse } from 'axios';
// import type { CommunityBoardResponseType } from '@/types/community';

// const handler: NextApiHandler = async (req, res) => {
//   const { boardIndex, page, lang, boardLang, view_type, topic } = req.query;
//   const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

//   try {
//     const response: AxiosResponse<CommunityBoardResponseType> = await axios.get(
//       `https://napi.appphotocard.com/voteWeb/boards/${boardIndex}?` +
//         `&page=${page}&per_page=20&lang=${lang}&filter_lang=${boardLang}&view_type=${view_type}&topic_ids[]=${topic}`,
//       {
//         headers: {
//           Origin: origin,
//           'Cache-Control': 'no-cache',
//         },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json('Failed to load Community-Board data');
//   }
// };

// export default handler;
