type OwnPropType = {
  boardName: string;
  onClick: () => void;
};

const PostToBoardButton = ({ boardName, onClick }: OwnPropType) => {
  return (
    <button
      css={{
        width: 'fit-content',
        padding: '6px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#fcdede',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        letterSpacing: '0.14px',
        color: '#ff5656',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {boardName}
    </button>
  );
};

export default PostToBoardButton;
