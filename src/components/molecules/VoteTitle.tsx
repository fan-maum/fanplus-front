import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';
import { VoteStatus } from './VoteHighRankTab';

export interface PromotionTitleProps {
  remainTime: string | undefined;
  voteStatus: VoteStatus;
  starName?: string;
}

export default function VoteTitle({ remainTime, voteStatus, starName }: PromotionTitleProps) {
  const language = GetLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];
  const activeBackgroundColor =
    voteStatus === 'N' ? '#FFD950' : voteStatus === 'R' ? '#bfcff6' : '#666';
  const activeColor = voteStatus !== 'E' ? '#000' : '#fff';
  const titlePrefix = voteStatus === 'N' ? voteLanguage?.voteEnd : voteLanguage?.voteStart;
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
      {voteStatus !== 'E' ? (
        <>
          {titlePrefix}
          <span
            css={[
              {
                paddingLeft: '6px',
              },
            ]}
          >
            {remainTime}
          </span>
        </>
      ) : (
        <>{voteLanguage?.voteFinished}</>
      )}
    </Stack>
  );
}
