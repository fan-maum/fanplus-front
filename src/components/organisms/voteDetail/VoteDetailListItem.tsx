import ShareButton from '@/components/atoms/ShareButton';
import { Button, Divider, Group, Stack } from '@/components/atoms';
import { VoteDetailStars } from '@/types/vote';
import { VoteButton } from '@/components/atoms/VoteButton';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export interface PromotionRankListItemProps {
  starData: VoteDetailStars;
  starState: React.ReactNode;
  // clickEvent: { voteOnClick: () => void; shareOnClick: () => void };
  targetRef?: React.RefObject<HTMLDivElement>;
}

const handleButtonClick = () => {
  const user_id = cookies.get('user_id');
  if (!user_id) {
    window.location.href = `/login/?nextUrl=${window.location.href}`;
  }
  // * vote 로직..
};

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
          <VoteButton onClick={handleButtonClick}>{voteDetailLanguage?.voting}</VoteButton>
        </Group>
      </Stack>
    </div>
  );
}

export default VoteDetailListItem;
