import { VoteDetailStars } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';
import { Stack } from '@/components/atoms/Stack';
import VoteDetailListItem from '@/components/organisms/voteDetail/VoteDetailListItem';
import VoteStarState from '@/components/molecules/voteDetail/VoteStarState';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';

export interface VoteDetailListProps {
  voteDetailStars: VoteDetailStars[];
  shareOnClick: (id: string) => void;
  voteOnClick: (id: string) => void;
}

function VoteDetailList({
  voteDetailStars,
  shareOnClick,
  voteOnClick,
  ...props
}: VoteDetailListProps) {
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  return (
    <>
      <Stack h={60} fz={22} fw={600} color="#000" pl={16} justify="center">
        {voteDetailLanguage?.voting}
      </Stack>
      <Stack spacing={0} justify="flex-start" css={{ backgroundColor: '#fff' }}>
        {voteDetailStars.map((item, index) => {
          return (
            <div key={item.STAR_IDX}>
              <VoteDetailListItem
                starData={item}
                starState={<VoteStarState starData={item} />}
                clickEvent={{
                  shareOnClick: () => shareOnClick(item.STAR_IDX),
                  voteOnClick: () => voteOnClick(item.STAR_IDX),
                }}
              />
            </div>
          );
        })}
      </Stack>
    </>
  );
}

export default VoteDetailList;
