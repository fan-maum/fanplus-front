import CommunityBoardLangSelector from '@/components/molecules/community/CommunityBoardLangSelector';
import BoardMobileTitle from '@/components/molecules/community/mobile/BoardMobileTitle';
import BoardMobileTabMenus from './BoardMobileTabMenus';
import BoardMobileDomains from './BoardMobileDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { BoardLangType, UrlLangType } from '@/types/common';
import { MultiBoardsInquiryItemType } from '@/types/community';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { openLanguageFitlerState, openSideBarState } from '@/store/community';
import { colors } from '@/styles/CommunityColors';
import { isPostDetailConstant } from '../PostDetailHeader';
import { communityPostTexts } from '@/texts/communityPostTexts';
import { useQueryClient } from 'react-query';
import { getCookie } from '@/utils/Cookie';

type BoardMobileTabProps = {
  urlLang: UrlLangType;
  boardLang: BoardLangType;
  withBoardTab?: boolean;
  boardSlug: MultiBoardsInquiryItemType;
};

const BoardMobileTab = ({ urlLang, boardLang, withBoardTab, boardSlug }: BoardMobileTabProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user_id = getCookie('user_id');
  const boardTexts = communityBoardTexts[urlLang];
  const setOpenSidebar = useSetRecoilState(openSideBarState);
  const setLangModal = useSetRecoilState(openLanguageFitlerState);
  const isNotBookmarkPage = router.route !== '/[locale]/community/bookmark';
  const text = communityPostTexts[urlLang];

  const isPostDetailBoardTitle: { [key: number | string]: string } = {
    community: text.headerTitle.all,
    2291: text.headerTitle.best,
  };

  const boardFrom: any = router.query.from;
  const isBoardTitle = isPostDetailConstant[boardFrom]
    ? isPostDetailBoardTitle[boardFrom]
    : boardSlug && boardSlug.BOARD_TITLE;
  const isSlugAll = router.route === '/[locale]/community';
  const boardTitle = isSlugAll ? text.headerTitle.all : isBoardTitle;
  const isSlugAllBookmarkId = isSlugAll ? 1 : Number(boardSlug && boardSlug.menu.id);

  const bookmarks: Array<any> | undefined = queryClient.getQueryData([
    'bookmarks',
    { userId: user_id, urlLang },
  ]);
  const isSlugAllBookmark = bookmarks && bookmarks.find((bookmark) => bookmark.slug === 'all');
  const isSlugAllBookmarked = isSlugAllBookmark ? isSlugAllBookmark.isBookmarked : false;
  const bookmarked = isSlugAll
    ? isSlugAllBookmarked
    : (boardSlug && boardSlug.menu.isBookmarked) || false;

  return (
    <div
      css={{
        display: 'none',
        '@media(max-width:768px)': { display: withBoardTab ? 'block' : 'none' },
      }}
    >
      {isNotBookmarkPage && (
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <BoardMobileTitle
            boardTitle={boardTitle}
            bookmarked={bookmarked}
            menuId={isSlugAllBookmarkId}
            onClickBack={() => router.back()}
          />
          <CommunityBoardLangSelector
            onClickOpenModal={() => setLangModal(true)}
            boardLang={boardLang}
          />
        </div>
      )}

      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          gap: 14,
          padding: '0 16px',
          borderBottom: `1px solid ${colors.gray[200]}`,
        }}
      >
        <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
        <BoardMobileDomains boardDomainTexts={boardTexts.bottomTabBar} />
      </div>
    </div>
  );
};

export default BoardMobileTab;
