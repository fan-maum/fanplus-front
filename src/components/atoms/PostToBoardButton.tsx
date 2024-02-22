import { useRouter } from 'next/router';

type OwnPropType = {
  boardName: string;
  onClick: () => void;
};

const PostToBoardButton = ({ boardName, onClick }: OwnPropType) => {
  const router = useRouter();
  const routeFrom = router.query.from as string;
  const routeBoardType = router.query.boardIndex as string;

  const BestOrAllBoard = ['community', '2291'];
  const isBestOrAll = BestOrAllBoard.includes(routeFrom) && routeBoardType !== '139';

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
        '@media(max-width: 768px)': { display: isBestOrAll ? 'block' : 'none' },
      }}
      onClick={onClick}
    >
      {boardName}
    </button>
  );
};

export default PostToBoardButton;
