import VoteDetailTemplate from './VoteDetailTemplate';
import VoteDetailHeader from '@/components/organisms/voteDetail/VoteDetailHeader';
import VoteDetailInfo, {
  VoteDetailInfoProps,
} from '@/components/organisms/voteDetail/VoteDetailInfo';
import VoteDetailPrizeList, {
  VoteDetailPrizeListProps,
  prizeTabContentsProps,
} from '@/components/organisms/voteDetail/VoteDetailPrizeList';
import VoteDetailList, {
  VoteDetailListProps,
} from '@/components/organisms/voteDetail/VoteDetailList';
import { getVoteDetail } from '@/api/Vote';

const voteDetailData = getVoteDetail();
const voteDetailInfo = voteDetailData.RESULTS.DATAS.VOTE_INFO;
console.log(voteDetailData);

const voteDetailInfoProps: VoteDetailInfoProps = {
  voteDetailInfo: voteDetailData.RESULTS.DATAS.VOTE_INFO,
};

export const prizeTabContents: prizeTabContentsProps = {
  prizeTabContentsItem: [
    {
      id: 'prizeTab_01',
      titleImage: '/icons/icon_explanation.png',
      title: '상세 내용',
      contents: {
        DESCRIPTION: voteDetailInfo.DESCRIPTION,
      },
    },
    {
      id: 'prizeTab_02',
      titleImage: '/icons/icon_medal1.png',
      title: '1위 혜택 보기',
      contents: {
        PRIZE_IMG: voteDetailInfo.FIRST_PRIZE_IMG,
        PRIZE_TITLE: voteDetailInfo.FIRST_PRIZE_TITLE,
        PRIZE_DESCRIPTION: voteDetailInfo.FIRST_PRIZE_DESCRIPTION,
      },
    },
    {
      id: 'prizeTab_03',
      titleImage: '/icons/icon_medal2.png',
      title: '2위 혜택 보기',
      contents: {
        PRIZE_IMG: voteDetailInfo.SECOND_PRIZE_IMG,
        PRIZE_TITLE: voteDetailInfo.SECOND_PRIZE_TITLE,
        PRIZE_DESCRIPTION: voteDetailInfo.SECOND_PRIZE_DESCRIPTION,
      },
    },
    {
      id: 'prizeTab_04',
      titleImage: '/icons/icon_medal3.png',
      title: '3위 혜택 보기',
      contents: {
        PRIZE_IMG: voteDetailInfo.THIRD_PRIZE_IMG,
        PRIZE_TITLE: voteDetailInfo.THIRD_PRIZE_TITLE,
        PRIZE_DESCRIPTION: voteDetailInfo.THIRD_PRIZE_DESCRIPTION,
      },
    },
  ],
};

const tabContent = {};

const voteDetailPrizeListProps: VoteDetailPrizeListProps = {
  prizeTabContents: prizeTabContents,
  voteDetailInfo: voteDetailData.RESULTS.DATAS.VOTE_INFO,
};

const voteDetailListProps: VoteDetailListProps = {
  voteDetailStars: voteDetailData.RESULTS.DATAS.VOTE_INFO.STARS,
  //   gender: tabState,
  //   listData: data,
  //   shareOnClick,
  //   voteOnClick,
  //   communityOnClick,
  //   scrollTargetId:
  //     (!imagePopup && +(typeof router.query.id === 'string' ? router.query.id : '')) || undefined,
  //   isRenderComplete: router.isReady && !imagePopup,
};

const VoteDetailLayout = () => {
  return (
    <div
      css={{
        background: '#FAFBFE',
      }}
    >
      <VoteDetailTemplate
        voteDetailHeader={<VoteDetailHeader />}
        voteDetailInfo={<VoteDetailInfo {...voteDetailInfoProps} />}
        voteDetailPrizeList={<VoteDetailPrizeList {...voteDetailPrizeListProps} />}
        voteDetailList={<VoteDetailList {...voteDetailListProps} />}
      />
      {/* <>testDiaLog</> */}
    </div>
  );
};

export default VoteDetailLayout;
