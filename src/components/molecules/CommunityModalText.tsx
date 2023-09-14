export interface VoteModalTextProps {
  voteText: React.ReactNode;
}

const CommunityModalText = ({ voteText, ...props }: VoteModalTextProps) => {
  return (
    <>
      <span css={{ lineHeight: '26px', fontSize: 18, fontWeight: 400, color: '#475357' }}>
        {voteText}
      </span>
    </>
  );
};

export default CommunityModalText;
