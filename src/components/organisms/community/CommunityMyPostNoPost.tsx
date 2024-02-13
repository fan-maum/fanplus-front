type OwnPropType = {
  texts?: string[];
};

const CommunityMyPostNoPost = ({ texts }: OwnPropType) => {
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
    </div>
  );
};

export default CommunityMyPostNoPost;
