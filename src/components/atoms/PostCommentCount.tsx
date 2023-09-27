import { useUrlLanguage } from '@/hooks/useLanguage';
import { commentTotalCountState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';

type PostCommentCountProps = {
  count: string | number;
};

export default function PostCommentCount({ count }: PostCommentCountProps) {
  const language = useUrlLanguage();
  const totalCountState: any = useRecoilState(commentTotalCountState(language))[0];
  const totalCount = totalCountState(Number(count));
  return (
    <span
      css={{
        color: '#000',
        fontSize: 24,
        fontWeight: 600,
      }}
    >
      {totalCount}
    </span>
  );
}
