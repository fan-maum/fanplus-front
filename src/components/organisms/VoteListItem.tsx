import { useState, useEffect } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import { FormatTime } from '@/utils/util';
import Link from 'next/link';
import { GetLanguage, GetRouterLanguage } from '@/hooks/useLanguage';
import VoteTitleImage from '../molecules/VoteTitleImage';
import VoteHighRankTab, { VoteHighRankTabProps } from '../molecules/VoteHighRankTab';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';

export interface VoteListItemProps {
  startDay: string;
  endDay: string;
  voteData: VoteData;
}

export type ReceivedVoteStatus = 'N' | 'E' | 'R';
export type TranslatedVoteStatus = 'ONGOING' | 'END' | 'READY';

const today = new Date();
export const voteStatusTranslation: { [key in ReceivedVoteStatus]: TranslatedVoteStatus } = {
  N: 'ONGOING',
  E: 'END',
  R: 'READY',
};

const VoteListItem = ({ startDay, endDay, voteData, ...props }: VoteListItemProps) => {
  const language = GetLanguage();
  const voteDetailLanguage = GetRouterLanguage();
  const voteDetailText = useRecoilState(voteDetailLangState(language))[0];
  const startDate = new Date(startDay);
  const endDate = new Date(endDay);
  const [seconds, setSeconds] = useState<number>();
  const interval = useInterval(() => setSeconds((second) => second && second - 1), 1000);

  const voteStatus = voteStatusTranslation[voteData.STATUS as ReceivedVoteStatus];

  useEffect(() => {
    if (voteStatus === 'ONGOING') {
      setSeconds(Math.floor((endDate.getTime() - today.getTime()) / 1000));
    }
    if (voteStatus === 'READY') {
      setSeconds(Math.floor((startDate.getTime() - today.getTime()) / 1000));
    }
    interval.start();
    return interval.stop;
  }, []);

  const remainTime = FormatTime(seconds);

  const VoteHighRankTabProps: VoteHighRankTabProps = {
    status: voteStatus,
    stars: {
      firstRankStarName: voteData?.FIRST_RANK_STAR_INFO?.STAR_NAME,
      secondRankStarName: voteData?.SECOND_RANK_STAR_INFO?.STAR_NAME,
    },
    votes: {
      voteDiff:
        parseInt(voteData?.FIRST_RANK_STAR_INFO?.VOTE_CNT) -
        parseInt(voteData?.SECOND_RANK_STAR_INFO?.VOTE_CNT),
      voteDiffFront: voteDetailText?.voteDifference.front as string,
      voteDiffBack: voteDetailText?.voteDifference.back as string,
      voteResult: voteDetailText?.voteResult as string,
    },
  };

  return (
    <Stack align="center" spacing={15} css={{ overflow: 'hidden' }}>
      <VoteTitle
        remainTime={remainTime}
        voteStatus={voteStatus}
        starName={voteData?.FIRST_RANK_STAR_INFO?.STAR_NAME}
      />
      <div
        css={[
          {
            position: 'relative',
            width: '100%',
            aspectRatio: '421/253',
          },
        ]}
      >
        <Link
          href={{
            pathname: `/${language}/voteDetail`,
            query: { vote_IDX: voteData.VOTE_IDX, lang: voteDetailLanguage },
          }}
        >
          <VoteTitleImage voteStatus={voteStatus} voteDataImage={voteData.TITLE_IMG} />
        </Link>
      </div>
      <div
        css={[
          {
            color: '#101010',
            fontSize: '18px',
            fontWeight: '600',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            width: '100%',
          },
        ]}
      >
        {voteData.TITLE}
      </div>
      {voteStatus !== 'READY' && (
        <Link
          href={{
            pathname: `/${language}/voteDetail`,
            query: { vote_IDX: voteData.VOTE_IDX, lang: voteDetailLanguage },
          }}
        >
          <VoteHighRankTab {...VoteHighRankTabProps} />
        </Link>
      )}
      <div
        css={{
          display: 'none',
          width: '100%',
          height: '1px',
          backgroundColor: '#d9d9d9',
          '@media(max-width:768px)': { display: 'block' },
        }}
      />
    </Stack>
  );
};

export default VoteListItem;
