import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';

const data = {
  VOTE_IDX: '202',
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
};

const endDate = new Date(data.END_DATE);

const VoteListItem = () => {
  return (
    <Stack align="center" spacing={12}>
      <VoteTitle endDate={endDate} STAR_NAME={data?.FIRST_RANK_STAR_INFO?.STAR_NAME} />
      <div
        css={[
          {
            position: 'relative',
            width: '100%',
            aspectRatio: '421/253',
          },
        ]}
      >
        <Image fill src="/images/vote_thumbnail_01.png" alt="vote_thumbnail" />
      </div>
      <div
        css={[
          {
            color: '#666',
            fontSize: '18px',
            fontWeight: '600',
          },
        ]}
      >
        8월 생일 기념일 아이돌 팬 투표
      </div>
    </Stack>
  );
};

export default VoteListItem;
