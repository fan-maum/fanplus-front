import ShareButton from '@/components/atoms/ShareButton';
import { Button, Divider, Group, Stack } from '@/components/atoms';
import { VoteDetailStars } from '@/types/vote';

export interface PromotionRankListItemProps {
  starData: VoteDetailStars
  starState: React.ReactNode;
  // clickEvent: { voteOnClick: () => void; shareOnClick: () => void; communityOnClick: () => void };
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
      <Stack p={16} pr={24} spacing={0}>
        {/* <PromotionStarState /> */}
        {starState}
        <Group spacing={8} position="right">
          <ShareButton
            // disabled={props.promoData.data.votes === null}
            // onClick={clickEvent.shareOnClick}
          />
          <Button color="gray" 
          // onClick={clickEvent.communityOnClick}
          >
            {/* <Typography category="button" color={colors.gray[750]}> */}
              게시판
            {/* </Typography> */}
          </Button>
          <Button 
          // onClick={clickEvent.voteOnClick}
          >
            투표
          </Button>
        </Group>
      </Stack>
      <Divider mx={24} />
    </div>
  );
}

export default VoteDetailListItem;