import BoardDomainItem from '@/components/molecules/community/BoardDomainItem';
import BoardMobileDomainItem from '@/components/molecules/community/mobile/BoardMobileDomainItem';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/router';

interface BoardMobileDomainsProps {
  boardDomainTexts: {
    write: string;
    all: string;
    popular: string;
    notice: string;
    myPost: string;
    bookmark: string;
  };
}

const BoardMobileDomains = ({ boardDomainTexts }: BoardMobileDomainsProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const boardType =
    router.route === '/[locale]/community'
      ? 'community'
      : router.route === '/[locale]/community/bookmark'
      ? 'bookmark'
      : router.query.boardIndex;
  const domain = router.query.domain;

  if (
    !boardType ||
    router.pathname.includes('write') ||
    router.pathname.includes('edit') ||
    router.pathname.includes('search')
  ) {
    return null;
  }

  const isSpecialPage = ['bookmark', 'community', '2291', '139'].includes(boardType as string);
  const bookmarkTabActive = boardType === 'bookmark';
  const allTabActive = boardType === 'community' || domain === 'all' || (!isSpecialPage && !domain);
  const bestTabActive = boardType === '2291' || domain === 'best_post';
  const noticeTabActive = boardType === '139' || domain === 'notice';

  const onClickBookmark = () => {
    router.replace(`/${urlLang}/community/bookmark`, undefined, {
      shallow: true,
    });
  };

  const onClickAll = async () => {
    isSpecialPage
      ? router.replace(`/${urlLang}/community`, undefined, {
          shallow: true,
        })
      : router.replace(
          { query: { ...router.query, view: 'all', page: 1, domain: 'all' } },
          undefined,
          {
            shallow: true,
          }
        );
    return;
  };
  const onClickPopular = async () => {
    isSpecialPage
      ? router.replace(`/${urlLang}/community/board/2291`)
      : router.replace(
          { query: { ...router.query, view: 'best_post', page: 1, domain: 'best_post' } },
          undefined,
          {
            shallow: true,
          }
        );
  };

  const onClickNotice = async () => {
    isSpecialPage
      ? router.replace(`/${urlLang}/community/board/139`)
      : router.replace(
          { query: { ...router.query, view: 'notice', page: 1, domain: 'notice' } },
          undefined,
          {
            shallow: true,
          }
        );
  };

  return (
    <div css={{ display: 'flex', alignItems: 'center', height: '28px', minWidth: '185px' }}>
      <BoardMobileDomainItem
        domainParam={boardDomainTexts.bookmark}
        active={bookmarkTabActive}
        onClick={onClickBookmark}
      />
      <BoardMobileDomainItem
        domainParam={boardDomainTexts.all}
        active={allTabActive}
        onClick={onClickAll}
      />
      <BoardMobileDomainItem
        domainParam={boardDomainTexts.popular}
        active={bestTabActive}
        onClick={onClickPopular}
      />
      <BoardMobileDomainItem
        domainParam={boardDomainTexts.notice}
        active={noticeTabActive}
        onClick={onClickNotice}
      />
    </div>
  );
};

export default BoardMobileDomains;
