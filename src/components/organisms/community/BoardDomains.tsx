import BoardDomainItem from '@/components/molecules/community/BoardDomainItem';
import { useRouter } from 'next/router';

const BoardDomains = ({ viewType }: { viewType: string }) => {
  const router = useRouter();
  const onClickAll = async () => {
    if (viewType !== 'all') {
      router.replace({ query: { ...router.query, view: 'all', page: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
  };
  const onClickPopular = async () => {
    if (viewType !== 'best_post') {
      router.replace({ query: { ...router.query, view: 'best_post', page: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
  };

  const onClickNotice = async () => {
    if (viewType !== 'notice') {
      router.replace({ query: { ...router.query, view: 'notice', page: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
  };
  return (
    <div css={{ minWidth: '170px', flex: 1 }}>
      <BoardDomainItem domainParam="전체글" domain="all" onClick={onClickAll} />
      <BoardDomainItem domainParam="인기글" domain="best_post" onClick={onClickPopular} />
      <BoardDomainItem domainParam="공지" domain="notice" onClick={onClickNotice} />
    </div>
  );
};

export default BoardDomains;
