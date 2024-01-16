import { useUrlLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const BestNoticeItem = ({
  rank,
  boardIndex,
  postIndex,
  postTitle,
  comments,
}: {
  rank: number;
  boardIndex: number;
  postIndex: number;
  postTitle: string;
  comments: number;
}) => {
  const urlLang = useUrlLanguage();
  const ranking = rank < 10 ? '0' + rank : rank;
  const commentCount = comments <= 999 ? comments : '+999';
  const bestPopularBoardIndex = 2291;

  return (
    <Link
      href={`/${urlLang}/community/board/${boardIndex}/${postIndex}?page=0&from=${bestPopularBoardIndex}`}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 17,
        padding: '0 17px',
        width: '100%',
        height: '42px',
        fontSize: '14px',
        fontWeight: 600,
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <span>{ranking}</span>
      <p
        css={{
          flex: 1,
          width: '180px',
          fontSize: '16px',
          fontWeight: '500',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          paddingRight: '5px',
        }}
      >
        {postTitle}
      </p>
      {!!commentCount && <span css={{ color: '#f26f72' }}>[{commentCount}]</span>}
    </Link>
  );
};

export default BestNoticeItem;
