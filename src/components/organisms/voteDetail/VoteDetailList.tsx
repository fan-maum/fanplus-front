import { VoteDetailStars } from '@/types/vote';
import { Divider } from '@/components/atoms/Divider';
import { Stack } from '@/components/atoms/Stack';
import VoteDetailListItem from '@/components/organisms/voteDetail/VoteDetailListItem';
import VoteStarState from '@/components/molecules/voteDetail/VoteStarState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { useEffect, useRef } from 'react';

export interface VoteDetailListProps {
  voteDetailStars: VoteDetailStars[];
  shareOnClick: (id: string) => void;
  voteOnClick: (id: string) => void;
  scrollTargetId?: string;
  isRenderComplete: boolean;
}

function VoteDetailList({
  voteDetailStars,
  shareOnClick,
  voteOnClick,
  scrollTargetId,
  isRenderComplete,
  ...props
}: VoteDetailListProps) {
  const language = useUrlLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current && isRenderComplete) {
      window.scroll({
        top: itemRef.current.offsetTop - 300,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [itemRef, voteDetailStars, isRenderComplete]);

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
                targetRef={item.STAR_IDX === scrollTargetId ? itemRef : undefined}
              />
            </div>
          );
        })}
      </Stack>
    </>
  );
}

export default VoteDetailList;
