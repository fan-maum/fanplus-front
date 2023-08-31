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
