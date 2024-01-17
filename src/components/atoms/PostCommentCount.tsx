import { useUrlLanguage } from '@/hooks/useLanguage';
import { commentTotalCountState } from '@/store/voteLangState';
import { colors } from '@/styles/CommunityColors';
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
        color: `${colors.gray[1000]}`,
        fontSize: 16,
        fontWeight: 600,
        marginLeft: 10,
      }}
    >
      {totalCount}
    </span>
  );
}
