import { VoteDetailVoteInfo } from '@/types/vote';
import VoteDetailItem from '@/components/organisms/voteDetail/VoteDetailItem';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';
import { Stack } from '@/components/atoms';
import { formatNumberWithComma } from '@/utils/util';
import RankProfile from '@/components/atoms/RankProfile';
import Link from 'next/link';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import Image from 'next/image';
import { VoteStatus } from '@/components/molecules/VoteHighRankTab';

export interface VoteDetailInfoProps {
  voteDetailInfo: VoteDetailVoteInfo;
}

const VoteDetailInfo = ({ voteDetailInfo, ...props }: VoteDetailInfoProps) => {
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const firstRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '1');
  const secondRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '2');
  return (
    <div css={{ padding: '0 16px' }}>
      <VoteDetailItem
        voteStatus={voteDetailInfo.STATUS as VoteStatus}
        startDay={voteDetailInfo.START_DATE}
        endDay={voteDetailInfo.END_DATE}
        voteDetailInfo={voteDetailInfo}
        firstRankStarName={firstRankStar?.STAR_NAME}
      />
      <Stack spacing={20} h={100} justify="center" align="center" direct="row" m={'0 auto'}>
        <RankProfile align="end">
          <Image width={36} height={36} src={'/icons/icon_medal1.png'} alt="icon_medal" />
          {firstRankStar?.STAR_NAME}
        </RankProfile>
        <RankProfile maxWidth="50%" fontSize={18} fontWeight={700} color="#FF5656" flex={'none'}>
          <div>[ LIVE ]</div>
          <div>
            {voteDetailLanguage?.voteDifference.front}
            <span css={{ padding: '0 3px' }}>
              {formatNumberWithComma(voteDetailInfo.VOTE_CNT_GAP)}
            </span>
            {voteDetailLanguage?.voteDifference.back}
          </div>
        </RankProfile>
        <RankProfile align="start">
          <Image width={36} height={36} src={'/icons/icon_medal2.png'} alt="icon_medal" />
          {secondRankStar?.STAR_NAME}
        </RankProfile>
      </Stack>
      {voteDetailInfo.LINK !== '' && (
        <UnstyledButton
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            borderRadius: '10px',
            background: '#FCEEEE',
            color: '#FC5280',
            fontSize: '17px',
            fontWeight: 600,
            margin: '0 auto 40px auto',
          }}
        >
          <Link
            href={voteDetailInfo.LINK}
            target="_blank"
            css={{
              display: 'inline-block',
              width: '100%',
              height: '100%',
              lineHeight: '60px',
            }}
          >
            <Center
              css={{
                padding: '0 50px',
                '@media(max-width:425px)': {
                  padding: '0 20px',
                },
              }}
            >
              {voteDetailInfo.LINK_TXT} {voteDetailLanguage?.seeMore}
              <Image width={24} height={24} src="/icons/icon_pinkArrow.svg" alt="arrow" />
            </Center>
          </Link>
        </UnstyledButton>
      )}
    </div>
  );
};

export default VoteDetailInfo;
