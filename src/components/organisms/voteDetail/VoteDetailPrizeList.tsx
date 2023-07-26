import { VoteDetailVoteInfo } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';
import VoteDetailPrizeBox from '@/components/molecules/voteDetail/VoteDetailPrizeBox';

export interface prizeTabContentsItemsProps {
  DESCRIPTION?: string;
  PRIZE_IMG?: string;
  PRIZE_TITLE?: string;
  PRIZE_DESCRIPTION?: string;
}
export interface prizeTabContentsProps {
  prizeTabContentsItem: {
    id: string;
    titleImage: string;
    title: string;
    contents: prizeTabContentsItemsProps;
  }[];
}

export interface VoteDetailPrizeListProps {
  prizeTabContents: prizeTabContentsProps;
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailPrizeList = ({
  prizeTabContents,
  voteDetailInfo,
  ...props
}: VoteDetailPrizeListProps) => {
  const items = prizeTabContents.prizeTabContentsItem;

  return (
    <>
      <Divider size={3} />
      <div>
        {items.map((items) => (
          <VoteDetailPrizeBox
            key={items.id}
            id={items.id}
            titleImage={items.titleImage}
            question={items.title}
            answer={items.contents}
          />
        ))}
      </div>
      <Divider size={3} />
    </>
  );
};

export default VoteDetailPrizeList;
