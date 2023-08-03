import ShareButton from '@/components/atoms/ShareButton';
import { Button, Divider, Group, Stack } from '@/components/atoms';
import { VoteDetailStars } from '@/types/vote';
import { VoteButton } from '@/components/atoms/VoteButton';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';

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
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  return (
    <div ref={targetRef} className={targetRef ? 'highlight' : undefined}>
      <Divider size={2} />
      <Stack p={'24px 16px 20px 16px'} spacing={20}>
        {starState}
        <Group spacing={8} position="right">
          <ShareButton
          // disabled={props.promoData.data.votes === null}
          // onClick={clickEvent.shareOnClick}
          />
          <VoteButton
          // onClick={clickEvent.voteOnClick}
          >
            {voteDetailLanguage?.voting}
          </VoteButton>
        </Group>
      </Stack>
    </div>
  );
}

export default VoteDetailListItem;