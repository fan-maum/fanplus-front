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
  const isFromSpecialPage = ['community', '2291', '139'].includes(router.query.from as string);
  const isContainSpecialPage = isSpecialPage || isFromSpecialPage;
  const isNoticePage = boardType === '139';
  const bookmarkTabActive = boardType === 'bookmark';

  const bestOrAllTabActive = (
    boardIndex: 'community' | '2291',
    domainName: 'all' | 'best_post'
  ) => {
    return (
      (boardType === boardIndex && !isNoticePage) ||
      domain === domainName ||
      (router.query.from === boardIndex && !isNoticePage)
    );
  };

  const allTabActive = bestOrAllTabActive('community', 'all') || !(isContainSpecialPage || domain);
  const bestTabActive = bestOrAllTabActive('2291', 'best_post');
  const noticeTabActive = boardType === '139' || domain === 'notice' || router.query.from === '139';

  const onClickBookmark = () => {
    router.push(`/${urlLang}/community/bookmark`, undefined, {
      shallow: true,
    });
  };

  const onClickAll = async () => {
    isContainSpecialPage
      ? router.push(`/${urlLang}/community`, undefined, {
          shallow: true,
        })
      : router.push(
          {
            pathname: `/${urlLang}/community/board/${router.query.boardIndex}`,
            query: { view: 'all', page: 1, domain: 'all', topic: 0 },
          },
          undefined,
          {
            shallow: true,
          }
        );
    return;
  };
  const onClickPopular = async () => {
    isContainSpecialPage
      ? router.push(`/${urlLang}/community/board/2291`)
      : router.push(
          {
            pathname: `/${urlLang}/community/board/${router.query.boardIndex}`,
            query: { view: 'best_post', page: 1, domain: 'best_post' },
          },
          undefined,
          {
            shallow: true,
          }
        );
  };

  const onClickNotice = async () => {
    isContainSpecialPage
      ? router.push(`/${urlLang}/community/board/139`)
      : router.push(
          {
            pathname: `/${urlLang}/community/board/${router.query.boardIndex}`,
            query: { view: 'notice', page: 1, domain: 'notice' },
          },
          undefined,
          {
            shallow: true,
          }
        );
  };

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        minWidth: '185px',
        overflowX: 'auto',
        overflowY: 'hidden',
        '::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
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
