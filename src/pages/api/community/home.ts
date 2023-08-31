import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';

export type ListItemType = {
  BOARD_IDX: string;
  BOARD_TITLE: string;
  HEAD_IMG: string | null;
  BOARD_ICON: string;
  POST_CNT: string;
  STAR_IDX: string | null;
  STAR_GROUP_IDX: string | null;
};

export type CommunityHomeResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      RECOMMEND_LIST: Array<ListItemType>;
      RECENTLY_LIST: Array<ListItemType>;
      SUBSCRIPTION_LIST: Array<ListItemType | null>;
    };
    TIMESTAMP: number;
  };
};

const handler: NextApiHandler = async (req, res) => {
  const identity = req.query.userId;
  const origin = process.env.NEXT_PUBLIC_CLIENT_URL || 'https://dev.fanplus.co.kr';

  try {
    const response: AxiosResponse<CommunityHomeResponseType> = await axios.get(
      `https://napi.appphotocard.com/v1/boards/boards?identity=${identity}&view_type=all&app_version=1.27.24`,
      {
        headers: {
          Origin: origin,
          'Cache-Control': 'no-cache',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json('failed to load data');
  }
};

export default handler;
