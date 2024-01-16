import type { ServerLangType, UrlLangType } from './common';

export type BoardListItemType = {
  BOARD_IDX: string;
  BOARD_TITLE: string;
  HEAD_IMG: string;
  BOARD_ICON: string;
  POST_CNT: number;
  STAR_IDX: string;
  STAR_GROUP_IDX: string;
};
export type RecommendListResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: { RECOMMEND_LIST: Array<BoardListItemType> };
    TIMESTAMP: number;
  };
};
export type RecentlyListResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: { RECENTLY_LIST: Array<BoardListItemType> };
    TIMESTAMP: number;
  };
};
export type SubscriptionListResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: { SUBSCRIPTION_LIST: Array<BoardListItemType> };
    TIMESTAMP: number;
  };
};

export type BoardInfoType = Omit<BoardListItemType, 'STAR_IDX' | 'STAR_GROUP_IDX'> & {
  IS_GROUP: 'Y' | 'N';
  IS_TREND: 'Y' | 'N';
};
export type NoticeListItemType = {
  POST_IDX: string;
  BOARD_IDX: string;
  POST_TITLE: string;
  POST_IMG_YN: 'Y' | 'N';
  WRITER_IDX: string;
  PUBLISH_DATE: string;
  VIEW_CNT: string;
  COMMENT_CNT: string;
  RECOMMEND_CNT: string;
  WRITER_NAME: string;
};
export type PostListItemType = {
  POST_IDX: string;
  BOARD_IDX: string;
  BOARD_TITLE: string;
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
  BOARD_INFO: {
    BOARD_IDX: string;
    BOARD_TITLE: string;
    IS_GROUP: 'Y' | 'N';
    IS_TREND: 'Y' | 'N';

    IDX: string;
    BASE_LANG: string;
    LEVEL: null;
    LEVEL_EXP: null;
    BOARD_ICON: string;
    HEAD_IMG: null;
    SUBSCRIPTION_CNT: string;
    BOOKMARK_CNT: string;
    RECOMMEND_CNT: string;
    RANK_SCORE: number;
    OWNER_IDX: string;
    IS_DISPLAY: 'Y' | 'N';
    IS_REMOVE: 'Y' | 'N';
    IS_BLIND: 'Y' | 'N';
    INS_DATE: string;
    UPD_DATE: null;
    REMOVE_DATE: null;
    POST_CNT: 'Y' | 'N';
    DEFAULT_TOPIC: number;
    NEW_POST_DATE: null;
    photocard_board_lang: Array<CommunityBoardPhotocardResponseType>;
  };
  NOTICE: Array<NoticeListItemType>;
  POST_LIST: Array<PostListItemType>;
};

export type CommunityBoardPhotocardResponseType = {
  IDX: string;
  BOARD_IDX: string;
  LANG_TYPE: string;
  TITLE: string;
  DISCRIPTION: string;
  INS_DATE: string;
  UPD_DATE: string;
};

export type CommunityMyPostResponseType = {
  BOARD_INFO: {
    VIEW_POSSIBLE_PAGE: number;
  };
  POST_LIST: Array<PostListItemType>;
};

export type CommunityMainPageResponseType = {
  BOARD_INFO: {
    VIEW_POSSIBLE_PAGE: number;
  };
  NOTICE: Array<NoticeListItemType>;
  POST_LIST: Array<PostListItemType>;
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

export type BoardResultItemType = BoardListItemType;

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
      BOARD_INFO: BoardInfoType;
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

export type PostCommentResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      COMMENT_IDX: number;
      FANFIC_EVENT_STATUS: string;
      FANFIC_EVENT_DESC: string;
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

export type PostBoardArticleResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      POST_IDX: number;
      MESSAGE: string;
    };
    TIMESTAMP: number;
  };
};

export type reportCommentResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {};
    TIMESTAMP: number;
  };
};

export type EditBoardArticleResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      MESSAGE: string;
    };
    TIMESTAMP: number;
  };
};

export type EditorImageUrlResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      SIGNED_URL: string;
      IMG_URL: string;
    };
    TIMESTAMP: number;
  };
};
export type EditorImageUploadResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      IMG_URL: string;
    };
    TIMESTAMP: number;
  };
};

export type PartialUserType = {
  nickname: string;
  profileImage: string;
};
export type UserResponseType = {
  RESULTS: {
    DATAS: {
      USER_IDX: number;
      NICK: string;
      EMAIL: string;
      SELF_INTRODCUTION: string | null;
      PROFILE_IMG_URL: string;
      USER_LANG: ServerLangType;
      SUBSCRIPTION_STARS: {
        COUNT: number;
        LIST: Array<{
          STAR_IDX: string;
          STAR_GROUP_IDX: string;
          SBUSCRIPTION_DATE: string;
          STAR_NAME: string;
          DEFAULT_PHOTO: string;
          STAR_GROUP_NAME: string | null;
        }>;
      };
      HAVE_CASH: number;
      HAVE_VOTETICKET: number;
      REMOVE_ADS_YN: string;
      ADDED_RECOMMENDER_YN: string;
      NEW_VOTE_TODAY_YN: string;
      UNREAD_ALERT_CNT: number;
      COMMENT_BLIND_YN: string;
      EXCHANGE_VOTE_TICKET_SALE_YN: string;
      NEW_EVENT_CHECK: null;
      NEW_NOTICE_CHECK: null;
      VOTE_TICKET_HISTORY_CNT: number;
      FRIENDS_CNT: number;
      MY_FRIENDS_CNT: number;
      MAX_FRIENDS_COUNT: number;
      FRIENDS_STATUS: string;
      PHONENUMBER_VERIFIED: boolean;
      MY_PHONENUMBER_VERIFIED: boolean;
      LIKE_ALERT_YN: string;
      COMMENT_ALERT_YN: string;
      CAN_GET_POST_CNT: {
        FRIENDS: number;
        SYSTEM: number;
        SUM: number;
      };
      FRIEND_REQUEST_CNT: number;
      BIAS_STAR: {
        STAR_IDX: number;
        STAR_NAME: string;
        INS_DATE: string;
      };
      BIRTHDAY: string | null;
      GENDER: string;
      PROFILE_COMPLETION_RATE: {
        NOW: number;
        MAX: number;
      };
      COUNTRY: {
        CODE: string | null;
        NAME: string | null;
      };
      ONBOARDING_FINISHED_YN: string;
      DISPLAY_RECOMMEND_FRIENDS: string;
      RECEIVE_FRIENDS_REQUEST: string;
      REFERRAL_CODE: string;
      BLOCK_STATUS: boolean;
      WELCOME_VOTE_RECEIVED_AT: string;
      DAILY_VOTE_RECEIVED_AT: string;
      WELCOME_TICKET_COUNT: number;
      DAILY_TICKET_COUNT: number;
    };
    ERROR: number;
    MSG: string;
    TIMESTAMP: number;
  };
};

export type PopularBoardItemType = {
  BOARD_IDX: string;
  RANK: string;
  UP_DOWN: string;
  WEEK: string;
  BOARD_TITLE: string;
};
export type Top50PopularBoardsResponseType = Array<PopularBoardItemType>;

export type BestPostItemType = {
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
  HAS_BEST_BADGE: '0' | '1';
  HAS_POPULAR_BADGE: '0' | '1';
  BEST_DATE: string;
  HEAD_IDX: null;
  HEAD_NAME: null;
};
export type BestPostsResponseType = {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      BEST_POST_LIST: Array<BestPostItemType>;
    };
    TIMESTAMP: number;
  };
};

export type BookmarksResponseType = Array<BookmarksItemType>;

export type BookmarksItemType = {
  id: string;
  title: string;
  isBookmarked: boolean;
  isExistNewPost: boolean;
  categoryId: string | null;
  parentId: string;
  boardId: string;
};
export type MainPageNoticesResponseType = Array<{
  IDX: string;
  BOARD_IDX: string;
  WRITER_IDX: string;
  HEAD_IDX: string | number | null;
  TOPIC_IDX: number;
  TITLE: string;
  CONTENTS: string;
  IMG_CNT: string;
  SUMNAILE_IMG: string;
  VIEW_CNT: string;
  COMMENT_CNT: string;
  LIKE_CNT: string;
  RECOMMEND_CNT: string;
  REPORT_CNT: string;
  IS_BLIND: 'Y' | 'N';
  IS_REMOVE: 'Y' | 'N';
  IS_PUBLISH: 'Y' | 'N';
  RANK_SCORE: number;
  INS_DATE: string;
  UPD_DATE: string;
  REMOVE_DATE: string | null;
  PUBLISH_DATE: string | null;
  PLATFORM: number;
  LANG: string;
  APP_LANG: string;
  ORIGIN_BOARD_IDX: string;
  ORIGIN_POST_IDX: string;
  TREND_DATE: string | null;
  HAS_BEST_BADGE: number;
  HAS_POPULAR_BADGE: number;
}>;

export type MultiBoardsInquiryItemType = {
  IDX: string;
  TITLE: string;
  BOARD_ICON: string;
  HEAD_IMG: string;
  POST_CNT: string;
  isExistNewPost: boolean;
};
export type MultiBoardsInquiryResponseType = Array<MultiBoardsInquiryItemType>;

/**
 * Side Menu
 */
export type sideMenuResponseType = Array<sideMenuItemType>;

export type sideMenuItemType = {
  id: string;
  title: string;
  isBookmarked: boolean;
  isExistNewPost: boolean;
  categoryId: string | null;
  parentId: string | null;
  boardId: string | null;
  children?: Array<subMenuItemType> | undefined;
};

export type subMenuItemType = {
  id: string;
  title: string;
  isBookmarked: boolean;
  isExistNewPost: boolean;
  categoryId: string | null;
  parentId: string;
  boardId: string;
};

export type sideMenuPhotoCardBoardInfo = {
  IDX: string;
  BASE_LANG: string;
  LEVEL: null;
  LEVEL_EXP: null;
  BOARD_ICON: string;
  HEAD_IMG: string | null;
  SUBSCRIPTION_CNT: string;
  BOOKMARK_CNT: string;
  RECOMMEND_CNT: string;
  RANK_SCORE: number;
  OWNER_IDX: string;
  IS_DISPLAY: 'Y' | 'N';
  IS_REMOVE: 'Y' | 'N';
  IS_BLIND: 'Y' | 'N';
  INS_DATE: string;
  UPD_DATE: string | null;
  REMOVE_DATE: string | null;
  POST_CNT: string;
  DEFAULT_TOPIC: number;
  NEW_POST_DATE: string | null;
  photocard_board_lang: Array<sideMenuPhotoCardBoardLang>;
};

export type sideMenuPhotoCardBoardLang = {
  IDX: string;
  BOARD_IDX: string;
  LANG_TYPE: string;
  TITLE: string;
  DISCRIPTION: string;
  INS_DATE: string;
  UPD_DATE: string;
};

export type sideMenuLang = {
  id: number;
  menuId: string;
  lang: UrlLangType;
  title: string;
};

export type sideMenuBoard = {
  TITLE: string;
  BOARD_TITLE: string;
  HEAD_IMG: string;
  POST_CNT: string;
  isExistNewPost: boolean;
};
