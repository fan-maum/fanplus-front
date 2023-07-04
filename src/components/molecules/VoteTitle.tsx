// import { useInterval } from '@/hooks/useInterval';
// import { formatTime } from '@/utils/util';
// import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import { Center } from '../atoms/Center';

export interface PromotionTitleProps {
  endDate: Date;
  STAR_NAME: string;
}

const today = new Date();

export default function VoteTitle({ endDate, STAR_NAME }: PromotionTitleProps) {
  //   const [seconds, setSeconds] = useState<number>();
  //   const interval = useInterval(() => setSeconds((s) => s && s - 1), 1000);
  //   useEffect(() => {
  //     interval.start();
  //     setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
  //     return interval.stop;
  //   }, []);
  //   const remainTime = formatTime(seconds);
  const remainTime = 1;
  const activeBackgroundColor = remainTime ? '#FFD950' : '#666';
  const activeColor = remainTime ? '#000' : '#fff';
  return (
    <Stack
      direct="row"
      justify="center"
      w={'100%'}
      bg={activeBackgroundColor}
      css={[
        {
          color: activeColor,
          fontSize: '14px',
          fontWeight: '400',
          borderRadius: '17px',
          lineHeight: '200%',
        },
      ]}
    >
      {remainTime ? (
        <>
          투표 종료까지
          <span
            css={[
              {
                paddingLeft: '6px',
                fontWeight: '600',
              },
            ]}
          >
            {/* {remainTime} */}
            09일 06시 29분
          </span>
        </>
      ) : (
        <>
          1위
          <span>
            <Image
              width={30}
              height={16}
              src={'/icons/icon_star.svg'}
              alt="Icon_star"
              css={[
                {
                  verticalAlign: 'middle',
                },
              ]}
            />
          </span>
          {STAR_NAME}
        </>
      )}
    </Stack>
  );
}
