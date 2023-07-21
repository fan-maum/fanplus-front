import { VoteDetailVoteInfo } from '@/types/vote';
import VoteListItem from '@/components/organisms/VoteListItem';
import { Button } from '@/components/atoms/Button';
import { Divider } from '@/components/atoms/Divider';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';

export interface VoteDetailInfoProps {
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailInfo = ({ voteDetailInfo, ...props }: VoteDetailInfoProps) => {
  return (
    <div css={{ padding: '0 16px' }}>
      <VoteListItem endDay={voteDetailInfo.END_DATE} voteData={voteDetailInfo} />
      <div>투표차</div>
      <UnstyledButton
        css={{
          height: 60,
          borderRadius: '10px',
          width: '100%',
          background: '#FCEEEE',
          color: '#FC5280',
          fontSize: '17px',
          fontWeight: 600,
          marginBottom: '40px',
        }}
      >
        <Center>
          팬플러스 리그전 자세히 알아보기 <img src="/icons/icon_pinkArrow.svg" alt="arrow" />
        </Center>
      </UnstyledButton>
      <Divider size={3} />
    </div>
  );
};

export default VoteDetailInfo;
