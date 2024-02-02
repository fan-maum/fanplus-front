import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { getCookie } from '@/utils/Cookie';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useQueryClient } from 'react-query';
import { BookmarksItemType } from '@/types/community';
import BoardMobileTabMenus from '@/components/organisms/community/mobile/BoardMobileTabMenus';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '@/store/community';
import { css } from '@emotion/react';
import BoardMobileTitle from './mobile/BoardMobileTitle';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardType: string | number;
  menuId: number | undefined;
  onClickWrite: () => void;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardType,
  menuId,
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

  const setOpenSidebar = useSetRecoilState(openSideBarState);

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const bookmarkData =
    bookmarkQueryData &&
    bookmarkQueryData.find((bookmark: BookmarksItemType) => Number(bookmark.id) === menuId);
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
          <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
          <BoardMobileTitle
            boardTitle={boardTitle}
            bookmarked={bookmarked}
            menuId={menuId}
            onClickBack={() => router.back()}
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
          {!isCommunityOrBestBoard && (
            <button
              css={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '6px 8px',
                fontSize: 14,
                fontWeight: 600,
                outline: 'none',
                border: 'none',
                color: '#fff',
                backgroundColor: colors.primary[500],
                borderRadius: 6,
                cursor: 'pointer',
              }}
              onClick={onClickWrite}
            >
              <img
                src="/icons/icon_pen.svg"
                alt="write-button"
                css={css`
                  width: 16px;
                  height: 16px;
                `}
              />
              {texts.bottomTabBar.write}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
