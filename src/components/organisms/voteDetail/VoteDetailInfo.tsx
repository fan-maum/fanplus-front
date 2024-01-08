import { VoteDetailVoteInfo } from '@/types/vote';
import VoteDetailItem from '@/components/organisms/voteDetail/VoteDetailItem';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';
import { Stack } from '@/components/atoms';
import { formatNumberWithComma } from '@/utils/util';
import RankProfile from '@/components/atoms/RankProfile';
import Link from 'next/link';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailAdBannerState, voteDetailLangState } from '@/store/voteLangState';
import type { ReceivedVoteStatus } from '../VoteListItem';
import { voteStatusTranslation } from '../VoteListItem';
import styled from '@emotion/styled';

export interface VoteDetailInfoProps {
  voteDetailInfo: VoteDetailVoteInfo;
  dailyTicketCount: number;
}

const VoteDetailInfo = ({ voteDetailInfo, dailyTicketCount, ...props }: VoteDetailInfoProps) => {
  const language = useUrlLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const voteAdBannerLang = useRecoilState(voteDetailAdBannerState(language))[0];
  const voteAdBannerTexts = voteAdBannerLang({
    dailyTicketCount: formatNumberWithComma(dailyTicketCount),
  });

  const firstRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '1');
  const secondRankStar = voteDetailInfo.STARS.find((star) => star.RANK === '2');
  const voteStatus = voteStatusTranslation[voteDetailInfo.STATUS as ReceivedVoteStatus];

  return (
    <>
      <div css={{ padding: '0 16px' }}>
        <VoteDetailItem
          voteStatus={voteStatus}
          startDay={voteDetailInfo.START_DATE}
          endDay={voteDetailInfo.END_DATE}
          voteDetailInfo={voteDetailInfo}
          firstRankStarName={firstRankStar?.STAR_NAME}
        />
        <Stack spacing={20} h={100} justify="center" align="center" direct="row" m={'0 auto'}>
          <RankProfile align="end">
            <img src="/icons/icon_medal1.png" alt="icon_medal" css={{ width: 36, height: 36 }} />
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
            <img src="/icons/icon_medal2.png" alt="icon_medal" css={{ width: 36, height: 36 }} />
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
                <img src="/icons/icon_pinkArrow.svg" alt="arrow" css={{ width: 24, height: 24 }} />
              </Center>
            </Link>
          </UnstyledButton>
        )}
      </div>
      <AdBanner>
        <div>
          <p dangerouslySetInnerHTML={{ __html: voteAdBannerTexts.message1 }}></p>
          <p dangerouslySetInnerHTML={{ __html: voteAdBannerTexts.message2 }}></p>
        </div>
      </AdBanner>
    </>
  );
};

export default VoteDetailInfo;

const AdBanner = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 110px;
  background-color: #ffc7d6;
  & > div {
    margin: 0 auto;
  }
  p {
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
    color: #000;
  }
  span {
    font-weight: 700;
    color: #ff1957;
  }
`;
