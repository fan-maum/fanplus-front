import { useUrlLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type BoardItemProps = {
  rank: number;
  boardName: string;
  boardIndex: number;
  rightItem?: ReactNode;
};

const PopularBoardItem = ({ rank, boardName, boardIndex, rightItem }: BoardItemProps) => {
  const urlLang = useUrlLanguage();
  const ranking = rank < 10 ? '0' + rank : rank;
  const router = useRouter();
  const handleBoardItemOnClick = () => {
    router.push(`/${urlLang}/community/board/${boardIndex}/`);
  };
  return (
    <div
      onClick={handleBoardItemOnClick}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
        height: '33px',
        borderBottom: '1px solid #d9d9d9',
        fontSize: '16px',
        fontWeight: 500,
        color: '#101010',
        cursor: 'pointer',
      }}
    >
      <span css={{ margin: '0 14px 0 17px', fontWeight: 600 }}>{ranking}</span>
      <p
        css={{
          width: '132px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {boardName}
      </p>
      {rightItem}
    </div>
  );
};

export default PopularBoardItem;
