import { Group, Stack, Avatar } from '@/components/atoms';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { voteDetailLangState } from '@/store/voteLangState';
import { VoteDetailStars } from '@/types/vote';
import { formatNumberWithComma } from '@/utils/util';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

export interface VoteStarStateProps {
  starData: VoteDetailStars;
}

const GRADIENT = [
  'linear-gradient(132.76deg, #FFF1D2 8.43%, #F8AC05 90.38%);',
  'linear-gradient(320.33deg, #9CA3A8 14.77%, #DBE7F0 85.62%);',
  'linear-gradient(317.25deg, #F18241 15.74%, #FFD9AF 84%);',
];

function VoteStarState({ starData, ...props }: VoteStarStateProps) {
  const rank = Number(starData.RANK);
  const Top3 = rank < 4;
  const imageURl = `/icons/icon_medalTop${rank}.png`;
  const language = useUrlLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  return (
    <Group spacing={16} align={'center'} style={{ flexWrap: 'nowrap' }}>
      {Top3 ? (
        <Image
          width={50}
          height={50}
          src={`/icons/icon_medal${starData.RANK}.png`}
          alt="icon_medal"
        />
      ) : (
        <div css={{ width: 50, textAlign: 'center', fontWeight: 600, fontSize: 22, color: '#666' }}>
          {starData.RANK}
        </div>
      )}
      <div css={{ position: 'relative' }}>
        {Top3 ? (
          <span
            css={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)' }}
          >
            <Image src={imageURl} width={16} height={10} alt={'medalTop'} />
          </span>
        ) : (
          <></>
        )}
        <Avatar
          css={
            starData.RANK && Top3
              ? {
                  position: 'relative',
                  background: Top3 ? GRADIENT[rank - 1] : '#F2F4F5',
                  padding: 2,
                }
              : {
                  background: '#F2F4F5',
                  padding: 2,
                }
          }
          imageProps={{
            style: { borderRadius: '10px' },
          }}
          w={60}
          h={78}
          radius={10}
          color="secondary.500"
          src={starData.PROFILE_IMG}
          alt="Avatar"
        />
      </div>
      <Stack spacing={4} fw={600} fz={17}>
        <div css={{ color: '#101010' }}>
          {starData.STAR_GROUP_IDX !== '0' && <>{starData.STAR_GROUP_NAME} </>}
          <span style={{ wordBreak: 'keep-all' }}>{starData.STAR_NAME}</span>
        </div>
        <div
          css={{
            fontSize: 18,
            color: '#666',
          }}
        >
          {formatNumberWithComma(Number(starData.VOTE_CNT)) || 0} {voteDetailLanguage?.currentVote}
        </div>
      </Stack>
    </Group>
  );
}

export default VoteStarState;
