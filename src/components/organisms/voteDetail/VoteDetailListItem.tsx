import ShareButton from '@/components/atoms/ShareButton';
import { Button, Divider, Group, Stack } from '@/components/atoms';
import { VoteDetailStars } from '@/types/vote';
import { VoteButton } from '@/components/atoms/VoteButton';

export interface PromotionRankListItemProps {
  starData: VoteDetailStars;
  starState: React.ReactNode;
  // clickEvent: { voteOnClick: () => void; shareOnClick: () => void };
  targetRef?: React.RefObject<HTMLDivElement>;
}

function VoteDetailListItem({
  starData,
  starState,
  targetRef,
  // clickEvent,
  ...props
}: PromotionRankListItemProps) {
  return (
    <div ref={targetRef} className={targetRef ? 'highlight' : undefined}>
      <Divider size={2} />
      <Stack p={16} pr={20} spacing={20}>
        {starState}
        <Group spacing={8} position="right">
          <ShareButton
          // disabled={props.promoData.data.votes === null}
          // onClick={clickEvent.shareOnClick}
          />
          <VoteButton
          // onClick={clickEvent.voteOnClick}
          >
            투표하기
          </VoteButton>
        </Group>
      </Stack>
    </div>
  );
}

export default VoteDetailListItem;
