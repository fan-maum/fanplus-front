import BoardDomainItem from '@/components/molecules/community/BoardDomainItem';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

interface BoardDomainsProps {
  viewType: string;
  boardDomainTexts: {
    write: string;
    all: string;
    popular: string;
    notice: string;
    myPost: string;
  };
}

const BoardDomains = ({ viewType, boardDomainTexts }: BoardDomainsProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
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
    <div css={{ display: 'flex', minWidth: '185px', height: '28px' }}>
      <BoardDomainItem domainParam={boardDomainTexts.all} domain="all" onClick={onClickAll} />
      <BoardDomainItem
        domainParam={boardDomainTexts.popular}
        domain="best_post"
        onClick={onClickPopular}
      />
      <BoardDomainItem
        domainParam={boardDomainTexts.notice}
        domain="notice"
        onClick={onClickNotice}
      />
    </div>
  );
};

export default BoardDomains;
