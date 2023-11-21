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

  return (
    <Link
      href={`/${urlLang}/community/board/${boardIndex}/${postIndex}/`}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        width: '100%',
        height: '42px',
        font: 'normal 14px/18px Pretendard',
        fontWeight: 600,
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <span css={{ margin: '0 17px' }}>{ranking}</span>
      <p
        css={{
          width: '180px',
          fontSize: '16px',
          fontWeight: '500',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginRight: '35px',
        }}
      >
        {postTitle}
      </p>
      <span css={{ color: '#f26f72' }}>[+ {comments} ]</span>
    </Link>
  );
};

export default BestNoticeItem;
