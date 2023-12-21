import GradientButton from '@/components/atoms/GradientButton';

type OwnPropType = {
  texts?: string[];
  buttonText: string;
  // onClickWrite: () => void;
};

const CommunityBoardNoPost = ({ texts, buttonText /*onClickWrite*/ }: OwnPropType) => {
  return (
    <div
      css={{
        width: '100%',
        height: '60vh',
        padding: '0px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '1.5',
        color: '#999',
        fontSize: '20px',
        textAlign: 'center',
      }}
    >
      {texts?.map((text, idx) => {
        return <p key={idx}>{text}</p>;
      })}
      <GradientButton text={buttonText} /*onClick={onClickWrite}*/ />
    </div>
  );
};

export default CommunityBoardNoPost;
