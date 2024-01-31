import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { BoardLangType } from '@/types/common';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { getCookie } from '@/utils/Cookie';
import CommunityBoardLangSelector from './CommunityBoardLangSelector';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useQueryClient } from 'react-query';
import { BookmarksItemType } from '@/types/community';
import BoardMobileTabMenus from '@/components/organisms/community/mobile/BoardMobileTabMenus';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '@/store/community';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardLang: BoardLangType;
  boardType: string | number;
  menuId: number | undefined;
  setLangModal: Dispatch<SetStateAction<boolean>>;
  onClickWrite: () => void;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardLang,
  boardType,
  menuId,
  setLangModal,
  onClickWrite,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  const path = router.asPath;
  const user_id = getCookie('user_id');
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];
  const isCommunityOrBestBoard = boardType === 'community' || boardType === 2291;
  const queryClient = useQueryClient();
  const bookmarkQueryData: any = queryClient.getQueriesData('bookmarks')[0][1];
  const isMainCommunity = router.route === '/[locale]/community';

  const setOpenSidebar = useSetRecoilState(openSideBarState);

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const bookmarkData = bookmarkQueryData.find(
    (bookmark: BookmarksItemType) => Number(bookmark.id) === menuId
  );
  const bookmarked = bookmarkData ? bookmarkData.isBookmarked : false;

  const handleBookmarkOnClick = async (menuId: number) => {
    if (!user_id) {
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    if (bookmarked) {
      useRemoveBookmark.mutate({ identity: user_id, menuId });
    } else {
      useAddBookmark.mutate({ identity: user_id, menuId });
    }
  };

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
          marginTop: 20,
          '@media (max-width: 768px)': { padding: '0 16px' },
        }}
      >
        <div
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            '@media (max-width: 768px)': { maxWidth: '48%' },
          }}
        >
          {!isMainCommunity && <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />}
          {!boardType && (
            <IconArrowLeft
              iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
              onClickBack={() => router.back()}
            />
          )}
          <h1
            css={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.gray[1000],
              wordBreak: 'keep-all',
            }}
          >
            {boardTitle}
          </h1>
          <BookmarkButton
            isBookmarked={bookmarked}
            width="24"
            height="24"
            onClick={() => handleBookmarkOnClick(Number(menuId))}
          />
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <CommunityBoardLangSelector
            onClickOpenModal={() => setLangModal(true)}
            boardLang={boardLang}
          />
          {!isCommunityOrBestBoard && (
            <button
              css={{
                padding: '5px 8px',
                fontSize: 14,
                fontWeight: 600,
                outline: 'none',
                border: 'none',
                color: '#fff',
                backgroundColor: colors.primary[500],
                borderRadius: 6,
                cursor: 'pointer',
                '@media(max-width:768px)': { display: 'none' },
              }}
              onClick={onClickWrite}
            >
              {texts.bottomTabBar.write}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
