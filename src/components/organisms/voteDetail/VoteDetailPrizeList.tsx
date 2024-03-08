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
    title: string | undefined;
    isRequired: boolean;
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
  const isShowThirdOrFourthPrize = items.find(
    (item) => item.isRequired === false && item.contents.PRIZE_IMG !== null
  );
  return (
    <>
      <Divider size={3} />
      <div>
        {items.map(
          (item, index) =>
            (item.isRequired || isShowThirdOrFourthPrize) && (
              <div key={item.id}>
                {index !== 0 && <Divider size={2} css={{ margin: '0 16px' }} />}
                <VoteDetailPrizeBox
                  id={item.id}
                  titleImage={item.titleImage}
                  question={item.title}
                  answer={item.contents}
                />
              </div>
            )
        )}
      </div>
      <Divider size={3} />
    </>
  );
};

export default VoteDetailPrizeList;
