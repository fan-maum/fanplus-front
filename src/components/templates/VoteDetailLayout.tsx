import VoteDetailTemplate from './VoteDetailTemplate';
import VoteDetailHeader from '@/components/organisms/voteDetail/VoteDetailHeader';
import VoteDetailInfo, {
  VoteDetailInfoProps,
} from '@/components/organisms/voteDetail/VoteDetailInfo';
import VoteDetailPrizeList, {
  VoteDetailPrizeListProps,
} from '@/components/organisms/voteDetail/VoteDetailPrizeList';
import VoteDetailList, {
  VoteDetailListProps,
} from '@/components/organisms/voteDetail/VoteDetailList';
import { getVoteDetail } from '@/api/Vote';

const voteDetailData = getVoteDetail();
console.log(voteDetailData);

const voteDetailInfoProps: VoteDetailInfoProps = {
  voteDetailInfo: voteDetailData.RESULTS.DATAS.VOTE_INFO,
};

const voteDetailPrizeListProps: VoteDetailPrizeListProps = {
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
