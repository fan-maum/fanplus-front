import { VoteDetailStars } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';
import { Stack } from '@/components/atoms/Stack';
import VoteDetailListItem from '@/components/organisms/voteDetail/VoteDetailListItem';
import VoteStarState from '@/components/molecules/voteDetail/VoteStarState';

export interface VoteDetailListProps {
  voteDetailStars: VoteDetailStars[];
}

function VoteDetailList({
  voteDetailStars,
  //   shareOnClick: (id: number, gender: Gender) => void;
  //   voteOnClick: (id: number, gender: Gender) => void;
  // communityOnClick: (url: string) => void;
  ...props
}: VoteDetailListProps) {
  return (
    <>
      <div>투표하기</div>
      <Divider size={2} />
      <Stack spacing={0} justify="flex-start" css={{ backgroundColor: '#fff' }}>
        {voteDetailStars.map((item, index) => {
          return (
            <div key={item.STAR_IDX}>
              <VoteDetailListItem
                starData={item}
                starState={<VoteStarState starData={item} />}
                // clickEvent={
                //   {
                //     shareOnClick: () => shareOnClick(item.VOTE_IDX),
                //     voteOnClick: () => voteOnClick(item.VOTE_IDX),
                //     communityOnClick: () => communityOnClick(item.VOTE_IDX),
                //   }
                // }
              />
            </div>
          );
        })}
      </Stack>
    </>
  );
}

export default VoteDetailList;
