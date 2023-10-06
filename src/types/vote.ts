export interface VoteData {
  VOTE_IDX: string;
  TITLE: string;
  TITLE_IMG: string;
  START_DATE: string;
  END_DATE: string;
  STATUS: string;
  FIRST_RANK_STAR_INFO: StarInfo;
  SECOND_RANK_STAR_INFO: StarInfo;
}

export interface StarInfo {
  STAR_IDX: string;
  STAR_GROUP_IDX: string;
  STAR_RANK: string;
  STAR_NAME: string;
  STAR_GROUP_NAME: string;
  STAR_IMG: string;
  VOTE_CNT: string;
}

export interface VoteResponse {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      PAGE: number;
      PER_PAGE: number;
      RETURN_CNT: number;
      TOTAL_CNT: number;
      TYPE: string;
      DATA: VoteData[];
    };
    TIMESTAMP: number;
  };
}

export interface VoteDetailVoteInfo {
  TITLE: string;
  TITLE_IMG: string;
  DESCRIPTION: string;
  LINK_TXT: string;
  LINK: string;
  FINISHED_LINK: string;
  FINISHED_BTN_TXT: string;
  START_DATE: string;
  END_DATE: string;
  STATUS: string;
  LIKE_CNT: string;
  COMMENT_CNT: string;
  TOTAL_VOTE_CNT: string;
  VOTE_CNT_GAP: number;
  FIRST_PRIZE_TITLE: string;
  SECOND_PRIZE_TITLE: string;
  THIRD_PRIZE_TITLE: string;
  FIRST_PRIZE_DESCRIPTION: string;
  SECOND_PRIZE_DESCRIPTION: string;
  THIRD_PRIZE_DESCRIPTION: string;
  FIRST_PRIZE_IMG: string;
  SECOND_PRIZE_IMG: string;
  THIRD_PRIZE_IMG: string;
  STARS: VoteDetailStars[];
}

export interface VoteDetailStars {
  RANK: string;
  VOTE_IDX: string;
  STAR_IDX: string;
  STAR_GROUP_IDX: string;
  PROFILE_IMG: string;
  VOTE_CNT: string;
  TOP_LAYER_IDX: string;
  STAR_NAME: string;
  STAR_DEFAULT_PHOTO: string;
  STAR_GROUP_NAME: string;
  BOARD_LIST: VoteDetailStarBoardList[];
}

export interface VoteDetailStarBoardList {
  BOARD_IDX: string;
}

export interface VoteDetailResponse {
  RESULTS: {
    ERROR: number;
    MSG: string;
    DATAS: {
      VOTE_INFO: VoteDetailVoteInfo;
    };
    TIMESTAMP: number;
  };
}
export interface VoteMutateParam {
  voteId: number;
  userId: string;
  starId: number;
}

export interface Result {
  code: number;
  message: string;
}
export interface voteModalTextProps {
  freeVoteCount?: string;
  starName?: string;
  moreVoteCount?: string;
}
