import { useRouter } from 'next/router';
import Image from 'next/image';
import { VoteStatus } from './VoteHighRankTab';

export interface VoteTitleImageProps {
  voteStatus: VoteStatus;
  voteDataImage: string;
}

export default function VoteTitleImage({ voteStatus, voteDataImage }: VoteTitleImageProps) {
  const router = useRouter();
  const voteDetailPage = router.route.includes('voteDetail');
  const fadeOutImage = voteStatus === 'E' && !voteDetailPage;

  return (
    <div
      css={[
        {
          position: 'relative',
          width: '100%',
          aspectRatio: '421/253',
        },
      ]}
    >
      <div
        css={[
          fadeOutImage && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              background: 'rgba(0,0,0,0.6)',
            },
          },
        ]}
      >
        <Image
          fill
          src={voteDataImage}
          alt="vote_thumbnail"
          css={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>
    </div>
  );
}
