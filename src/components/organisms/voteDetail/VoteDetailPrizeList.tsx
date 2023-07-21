import { VoteDetailVoteInfo } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';

export interface VoteDetailPrizeListProps {
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailPrizeList = ({ voteDetailInfo, ...props }: VoteDetailPrizeListProps) => {
  return (
    <>
      <div>
        <div>상세내용</div>
        <Divider size={2} css={{ margin: '0 16px' }} />
        <div>1위 혜택 보기</div>
        <Divider size={2} css={{ margin: '0 16px' }} />
        <div>2위 혜택 보기</div>
        <Divider size={2} css={{ margin: '0 16px' }} />
        <div>3위 혜택 보기</div>
      </div>
      <Divider size={3} />
    </>
  );
};

export default VoteDetailPrizeList;
