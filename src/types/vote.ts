export interface VoteData {
  VOTE_IDX: string;
  TITLE: string;
  TITLE_IMG: string;
  START_DATE: string;
  END_DATE: string;
  STATUS: string;
  FIRST_RANK_STAR_INFO: FirstRankStarData;
}

export interface FirstRankStarData {
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
      TYPE: string;
      DATA: VoteData[];
    };
    TIMESTAMP: number;
  };
}
