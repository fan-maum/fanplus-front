import { Stack } from '../atoms/Stack';
import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { TranslatedVoteStatus } from '../organisms/VoteListItem';

export interface PromotionTitleProps {
  remainTime: string | undefined;
  voteStatus: TranslatedVoteStatus;
  starName?: string;
}

export default function VoteTitle({ remainTime, voteStatus, starName }: PromotionTitleProps) {
  const language = useUrlLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];
  const activeBackgroundColor =
    voteStatus === 'ONGOING' ? '#FFD950' : voteStatus === 'READY' ? '#bfcff6' : '#666';
  const activeColor = voteStatus !== 'END' ? '#000' : '#fff';
  const titlePrefix = voteStatus === 'ONGOING' ? voteLanguage?.voteEnd : voteLanguage?.voteStart;
  return (
    <Stack
      direct="row"
      justify="center"
      w={'100%'}
      h={'auto'}
      mih={38}
      align="center"
      bg={activeBackgroundColor}
      css={[
        {
          flexWrap: 'wrap',
          color: activeColor,
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '17px',
          lineHeight: '200%',
        },
      ]}
    >
      {voteStatus !== 'END' ? (
        <>
          {titlePrefix}
          <span css={{ paddingLeft: '6px' }}>{remainTime}</span>
        </>
      ) : (
        <>{voteLanguage?.voteFinished}</>
      )}
    </Stack>
  );
}
