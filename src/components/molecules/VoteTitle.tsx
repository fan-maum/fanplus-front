import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';

export interface PromotionTitleProps {
  remainTime: string | undefined;
  remainTimeState: boolean;
  starName?: string;
}

export default function VoteTitle({ remainTime, remainTimeState, starName }: PromotionTitleProps) {
  const language = GetLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];
  const activeBackgroundColor = remainTimeState ? '#FFD950' : '#666';
  const activeColor = remainTimeState ? '#000' : '#fff';
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
      {remainTimeState ? (
        <>
          {voteLanguage?.voteEnd}
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
