export interface VoteTitleImageProps {
  remainTimeState: boolean;
  voteDataImage: string;
}

export default function VoteTitleImage({ remainTimeState, voteDataImage }: VoteTitleImageProps) {
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
          !remainTimeState && {
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
        <img
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
