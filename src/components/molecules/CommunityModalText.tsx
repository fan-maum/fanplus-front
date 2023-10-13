export type CommunityModalTextProps = {
  text: React.ReactNode;
};

const CommunityModalText = ({ text, ...props }: CommunityModalTextProps) => {
  return (
    <>
      <span css={{ lineHeight: '26px', fontSize: 18, fontWeight: 400, color: '#475357' }}>
        {text}
      </span>
    </>
  );
};

export default CommunityModalText;
