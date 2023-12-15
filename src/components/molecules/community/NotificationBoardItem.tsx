import { useUrlLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const NotificationBoardItem = ({
  rank,
  postIndex,
  postTitle,
  comments,
}: {
  rank: number;
  postIndex: number;
  postTitle: string;
  comments: number;
}) => {
  const urlLang = useUrlLanguage();
  const ranking = rank < 10 ? '0' + rank : rank;
  const commentCount = comments <= 999 ? comments : '+999';
  const NotificationBoardIndex = 139;

  return (
    <Link
      href={`/${urlLang}/community/board/${NotificationBoardIndex}/${postIndex}/`}
      css={{
        display: 'flex',
        gap: 14,
        width: '100%',
      }}
    >
      <span css={{ fontSize: 14, fontWeight: 'bold', color: '#101010' }}>{ranking}</span>
      <p
        css={{
          flex: 1,
          width: '130px',
          fontSize: '16px',
          fontWeight: '400',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {postTitle}
      </p>
      {!!commentCount && <span css={{ color: '#f26f72' }}>[{commentCount}]</span>}
    </Link>
  );
};

export default NotificationBoardItem;
