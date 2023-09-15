export type BoardListItemType = {
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
    };
    TIMESTAMP: number;
  };
};

/**
 * Search Board
 */
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

export type BoardResultItemType = {
  BOARD_IDX: number;
  BOARD_TITLE: string;
  HEAD_IMG: string;
  BOARD_ICON: string;
  POST_CNT: number;
  STAR_IDX: number | null;
  STAR_GROUP_IDX: number | null;
};

export type CommunityBoardResultResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      TOTAL_COUNT: number;
      BOARD_LIST: Array<BoardResultItemType>;
    };
    TIMESTAMP: number;
  };
};

/**
 * Post
 */
export type PostInfoItemType = {
  POST_IDX: string;
  TOPIC_NAME: string;
  POST_TITLE: string;
  POST_CONTENTS: string;
  BOARD_IDX: string;
  TOPIC_IDX: string;
  POST_IMG_YN: string;
  SUMNAIL_IMG: string;
  WRITER_IDX: string;
  PUBLISH_DATE: string;
  VIEW_CNT: string;
  COMMENT_CNT: string;
  RECOMMEND_CNT: string;
  IS_REMOVE: string;
  IS_PUBLISH: string;
  HAS_BEST_BADGE: string;
  HAS_POPULAR_BADGE: string;
  BASE_LANG: string;
  BEST_DATE: string;
  WRITER_NAME: string;
  WRITER_PROFILE_IMG: string;
  RECOMMEND_YN: string;
  THUMBNAIL_IMG: string;
};
export type PostInfoCommentItemType = {
  COMMENT_IDX: string;
  TYPE: string;
  TARGET: string;
  TARGET_IDX: string;
  USER_IDX: string;
  COMMENT: string;
  IS_BLIND: string;
  IS_REMOVED: string;
  LIKE_CNT: string;
  SPAM_REPORT_CNT: string;
  BAD_REPORT_CNT: string;
  RE_COMMENT_CNT: string;
  INS_DATE: string;
  UPD_DATE: string;
  BLIND_DATE: string;
  REMOVE_DATE: string;
  USER_PROFILE_IMG: string;
  NICK: string;
  USER_LANG: string;
  IDX: string;
  COMMENT_BLIND_YN: string;
  ALREADY_LIKE: string;
};

export type PostInfoHeadListItemType = {
  HEAD_IDX: string;
  BOARD_IDX: string;
  LANG_TYPE: string;
  HEAD_NAME: string;
};

export type PostResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      POST_INFO: PostInfoItemType;
      COMMENT_LIST: Array<PostInfoCommentItemType>;
      HEAD_LIST: Array<PostInfoHeadListItemType>;
    };
    TIMESTAMP: number;
  };
};

export type CommentListItemType = {
  COMMENT_IDX: string;
  IS_WRITER: string;
  LIKE_CNT: string;
  RE_COMMENT_CNT: string;
  INS_DATE: string;
  COMMENT: string | boolean;
  WRITER_IDX: string;
  NICK: string;
  ALREADY_LIKE: string;
  IS_BEST_COMMENT: string;
  PROFILE_IMG_URL: string;
  IS_BLOCKED_USER: string;
};

export type CommentResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      TOTAL_CNT: number;
      BEST_COMMENTS: [];
      COMMENTS: Array<CommentListItemType>;
      PAGE: number;
      PER_PAGE: string;
    };
    TIMESTAMP: number;
  };
};

export type replyResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      TOTAL_CNT: number;
      ORIGINAL_COMMENTS: CommentListItemType;
      BEST_COMMENTS: [];
      COMMENTS: Array<CommentListItemType>;
      PAGE: number;
      PER_PAGE: string;
    };
    TIMESTAMP: number;
  };
};
