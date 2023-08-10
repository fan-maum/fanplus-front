export interface VoteModalTextProps {
  voteText: React.ReactNode;
}

const VoteModalText = ({ voteText, ...props }: VoteModalTextProps) => {
  return (
    <>
      <span css={{ lineHeight: '26px', fontSize: 18, fontWeight: 400, color: '#475357' }}>
        {voteText}
      </span>
    </>
  );
};

export default VoteModalText;
