import { useRouter } from 'next/router';
import CommunityBoardLayout from './CommunityBoardLayout';
import { BoardPropType } from '@/pages/[locale]/community/board/[boardIndex]';

const CommunityBoardTemplate = ({
  queryParams,
  communityBoardSSRdata,
  communityBoardTopics,
  communityNoticeBannerData,
  initialProps,
}: BoardPropType) => {
  const router = useRouter();
  const boardType = Number(router.query.boardIndex);

  return (
    <CommunityBoardLayout
      queryParams={queryParams}
      communityBoardSSRdata={communityBoardSSRdata}
      initialProps={initialProps}
      boardType={boardType}
      boardTitle={communityBoardSSRdata.BOARD_INFO.photocard_board_lang[0].TITLE}
      communityBoardTopics={communityBoardTopics}
      communityNoticeBannerData={communityNoticeBannerData}
    />
  );
};

export default CommunityBoardTemplate;
