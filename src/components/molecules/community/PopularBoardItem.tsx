import { useUrlLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';
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
  return (
    <Link
      href={`/${urlLang}/community/board/${boardIndex}/`}
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
    </Link>
  );
};

export default PopularBoardItem;
