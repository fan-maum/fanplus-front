import { VoteDetailVoteInfo } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';
import VoteDetailPrizeBox from '@/components/molecules/voteDetail/VoteDetailPrizeBox';

export interface VoteDetailPrizeListProps {
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailPrizeList = ({ voteDetailInfo, ...props }: VoteDetailPrizeListProps) => {
  const texts = {
    q0: '상세 내용',
    q1: '1위 혜택 보기',
    q2: '2위 혜택 보기',
    q3: '3위 혜택 보기',
    a0: voteDetailInfo.FIRST_PRIZE_TITLE,
    a1: voteDetailInfo.FIRST_PRIZE_TITLE,
    a2: voteDetailInfo.SECOND_PRIZE_TITLE,
    a3: voteDetailInfo.THIRD_PRIZE_TITLE,
    // q1: voteDetailInfo.FIRST_PRIZE_IMG,
    // q1: voteDetailInfo.FIRST_PRIZE_TITLE,
    // q1: voteDetailInfo.FIRST_PRIZE_DESCRIPTION,
    // q1: voteDetailInfo.SECOND_PRIZE_IMG,
    // q1: voteDetailInfo.SECOND_PRIZE_TITLE,
    // q1: voteDetailInfo.SECOND_PRIZE_DESCRIPTION,
    // q1: voteDetailInfo.THIRD_PRIZE_IMG,
    // q1: voteDetailInfo.THIRD_PRIZE_TITLE,
    // q1: voteDetailInfo.THIRD_PRIZE_DESCRIPTION,
  };

  return (
    <>
      <Divider size={3} />
      <div>
        <VoteDetailPrizeBox question={texts.q0} answer={texts.a0} />
        <Divider size={2} css={{ margin: '0 16px' }} />
        <VoteDetailPrizeBox question={texts.q1} answer={texts.a1} />
        <Divider size={2} css={{ margin: '0 16px' }} />
        <VoteDetailPrizeBox question={texts.q2} answer={texts.a2} />
        <Divider size={2} css={{ margin: '0 16px' }} />
        <VoteDetailPrizeBox question={texts.q3} answer={texts.a3} />
      </div>
      <Divider size={3} />
    </>
  );
};

export default VoteDetailPrizeList;
