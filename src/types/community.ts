export type BoardListItemType = {
  BOARD_IDX: string;
  BOARD_TITLE: string;
  HEAD_IMG: string | null;
  BOARD_ICON: string | null;
  POST_CNT: string;
  STAR_IDX: string | null;
  STAR_GROUP_IDX: string | null;
};
export type CommunityHomeResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      RECOMMEND_LIST: Array<BoardListItemType>;
      RECENTLY_LIST: Array<BoardListItemType>;
      SUBSCRIPTION_LIST: Array<BoardListItemType | null>;
    };
    TIMESTAMP: number;
  };
};

export type PostListItemType = {
  POST_IDX: string;
  BOARD_IDX: string;
  TOPIC_NAME: string;
  POST_TITLE: string;
  POST_IMG_YN: 'Y' | 'N';
  SUMNAIL_IMG: string;
  WRITER_IDX: string;
  PUBLISH_DATE: string;
  VIEW_CNT: string;
  COMMENT_CNT: string;
  RECOMMEND_CNT: string;
  HAS_BEST_BADGE: string;
  HAS_POPULAR_BADGE: string;
  HEAD_IDX: string | number | null;
  HEAD_NAME: string | null;
  WRITER_NAME: string;
  WRITER_PROFILE_IMG: string;
  NEW_POST_YN: 'Y' | 'N';
};
export type CommunityBoardResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      BOARD_INFO: Omit<BoardListItemType, 'STAR_IDX' | 'STAR_GROUP_IDX'> & {
        IS_GROUP: 'Y' | 'N';
        IS_TREND: 'Y' | 'N';
      };
      POST_LIST: Array<PostListItemType>;
    };
    TIMESTAMP: number;
  };
};

export type TopicListItemType = {
  IDX: number;
  NAME: string;
  STATUS: 'Y' | 'N';
  POST_CNT: number;
};
export type CommunityBoardTopicResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      TOPIC_LIST: Array<TopicListItemType>;
      DATE: string;
    };
    TIMESTAMP: number;
  };
};

export type BoardCategoryItemType = {
  CATEGORY_IDX: number;
  CATEGORY_NAME: string;
};

export type CommunityBoardCategoryResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      CATEGORY_LIST: Array<BoardCategoryItemType>;
    };
    TIMESTAMP: number;
  };
};

export type BoardResultItemType = BoardListItemType;

export type CommunityBoardResultResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      BOARD_LIST: Array<BoardResultItemType>;
    };
    TIMESTAMP: number;
  };
};

export type CommunityNoticeBannerItemType = {
  ORDER: number;
  BOARD_IDX: number;
  POST_IDX: number;
  TITLE: string;
  SUB_TITLE: string;
  BG_HEX: string;
  TITLE_HEX: string;
  SUBTITLE_HEX: string;
  BANNER_IDX: number;
};
export type CommunityNoticeBannerResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      COUNT: number;
      LIST: Array<CommunityNoticeBannerItemType>;
    };
    TIMESTAMP: number;
  };
};
