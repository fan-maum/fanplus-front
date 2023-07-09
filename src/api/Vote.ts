import { VoteResponse } from './../types/vote';
import { voteInstance } from './Instance';
import axios from "axios";

export const getCurrentVotes = async (): Promise<VoteResponse> => {
  // {{hostname}}/v2/votes/201?vote_type=R&page=0&per_page=9
  const response: VoteResponse = await {
    RESULTS: {
      ERROR: 0,
      MSG: 'success',
      DATAS: {
        PAGE: 0,
        PER_PAGE: 6,
        RETURN_CNT: 2, // 더미데이터라 2개만 작성했습니다
        TYPE: '리그',
        DATA: [
          {
            VOTE_IDX: '201',
            TITLE: '1부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/202/TITLE_IMG_ko_KR_20230629145737.png', //투표썸네일
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00', //투표종료일자
            STATUS: 'N', //투표상태 ( R:예정 , N: 진행중 , E:종료 , D:작성중 (해당상태는 목록에 존재할일없음) )
            FIRST_RANK_STAR_INFO: {
              // 현재 투표에서 1위중인 스타정보
              STAR_IDX: '16',
              STAR_GROUP_IDX: '52',
              STAR_RANK: '1',
              STAR_NAME: '뷔',
              STAR_GROUP_NAME: 'BTS (Bangtan Boys)',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/1652.png',
              VOTE_CNT: '41638485',
            },
          },
          {
            VOTE_IDX: '202',
            TITLE: '2부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/203/TITLE_IMG_ko_KR_20230629150320.png',
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00',
            STATUS: 'N',
            FIRST_RANK_STAR_INFO: {
              STAR_IDX: '34',
              STAR_GROUP_IDX: '2',
              STAR_RANK: '1',
              STAR_NAME: '유겸',
              STAR_GROUP_NAME: 'GOT7',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/342.png',
              VOTE_CNT: '2019062',
            },
          },
          {
            VOTE_IDX: '203',
            TITLE: '1부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/202/TITLE_IMG_ko_KR_20230629145737.png', //투표썸네일
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00', //투표종료일자
            STATUS: 'N', //투표상태 ( R:예정 , N: 진행중 , E:종료 , D:작성중 (해당상태는 목록에 존재할일없음) )
            FIRST_RANK_STAR_INFO: {
              // 현재 투표에서 1위중인 스타정보
              STAR_IDX: '16',
              STAR_GROUP_IDX: '52',
              STAR_RANK: '1',
              STAR_NAME: '뷔',
              STAR_GROUP_NAME: 'BTS (Bangtan Boys)',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/1652.png',
              VOTE_CNT: '41638485',
            },
          },
          {
            VOTE_IDX: '204',
            TITLE: '2부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/203/TITLE_IMG_ko_KR_20230629150320.png',
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00',
            STATUS: 'N',
            FIRST_RANK_STAR_INFO: {
              STAR_IDX: '34',
              STAR_GROUP_IDX: '2',
              STAR_RANK: '1',
              STAR_NAME: '유겸',
              STAR_GROUP_NAME: 'GOT7',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/342.png',
              VOTE_CNT: '2019062',
            },
          },
          {
            VOTE_IDX: '205',
            TITLE: '1부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/202/TITLE_IMG_ko_KR_20230629145737.png', //투표썸네일
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00', //투표종료일자
            STATUS: 'N', //투표상태 ( R:예정 , N: 진행중 , E:종료 , D:작성중 (해당상태는 목록에 존재할일없음) )
            FIRST_RANK_STAR_INFO: {
              // 현재 투표에서 1위중인 스타정보
              STAR_IDX: '16',
              STAR_GROUP_IDX: '52',
              STAR_RANK: '1',
              STAR_NAME: '뷔',
              STAR_GROUP_NAME: 'BTS (Bangtan Boys)',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/1652.png',
              VOTE_CNT: '41638485',
            },
          },
          {
            VOTE_IDX: '206',
            TITLE: '2부 리그전 투표 - 남자아이돌 (3회차)',
            TITLE_IMG:
              'https://cdnetphoto.appphotocard.com/vote_thumbnail/203/TITLE_IMG_ko_KR_20230629150320.png',
            START_DATE: '2023-06-29 17:00:00',
            END_DATE: '2023-07-12 17:00:00',
            STATUS: 'N',
            FIRST_RANK_STAR_INFO: {
              STAR_IDX: '34',
              STAR_GROUP_IDX: '2',
              STAR_RANK: '1',
              STAR_NAME: '유겸',
              STAR_GROUP_NAME: 'GOT7',
              STAR_IMG: 'http://cdnetphoto.appphotocard.com/star_icon/342.png',
              VOTE_CNT: '2019062',
            },
          },
        ],
      },
      TIMESTAMP: 1688365523,
    },
  };
  return response;
};

export const getVotes = async (vote_type:string | undefined | null, page: number | string) => {
      const request = await fetch(`https://napi.appphotocard.com/v2/votes/votes?vote_type=${vote_type}&page=${page}&per_page=2`);
      const response = await request.json();
      return response;
  }