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

type BoardMobileTabProps = {
  urlLang: UrlLangType;
  boardLang: BoardLangType;
  withBoardTab?: boolean;
  boardSlug: MultiBoardsInquiryItemType;
};

const BoardMobileTab = ({ urlLang, boardLang, withBoardTab, boardSlug }: BoardMobileTabProps) => {
  const router = useRouter();
  const boardTexts = communityBoardTexts[urlLang];
  const setOpenSidebar = useSetRecoilState(openSideBarState);
  const setLangModal = useSetRecoilState(openLanguageFitlerState);
  const isNotBookmarkPage = router.route !== '/[locale]/community/bookmark';

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
            boardTitle={boardSlug && boardSlug.BOARD_TITLE}
            bookmarked={(boardSlug && boardSlug.menu.isBookmarked) || false}
            menuId={Number(boardSlug && boardSlug.menu.id)}
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
