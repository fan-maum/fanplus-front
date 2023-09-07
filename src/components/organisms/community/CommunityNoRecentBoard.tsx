import { Stack } from '@/components/atoms';
import GradientButton from '@/components/atoms/GradientButton';

type CommunityNoRecentBoardType = {
  title: string;
  texts: string[];
  buttonText: string;
  onClickSearch: () => void;
};

const CommunityNoRecentBoard = ({
  title,
  texts,
  buttonText,
  onClickSearch,
}: CommunityNoRecentBoardType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      <h4 css={{ margin: '15px 5px' }}>{title}</h4>
      <Stack
        align="center"
        justify="center"
        css={{
          padding: '40px 15px',
          lineHeight: '1.8',
          fontWeight: '600',
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        {texts.map((text, idx) => {
          return <p key={idx}>{text}</p>;
        })}
        <GradientButton text={buttonText} onClick={onClickSearch} />
      </Stack>
    </section>
  );
};

export default CommunityNoRecentBoard;
