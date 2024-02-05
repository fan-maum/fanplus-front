import { useRouter } from 'next/router';
import { colors } from '@/styles/CommunityColors';
import { useUrlLanguage } from '@/hooks/useLanguage';
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
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];
  const isCommunityOrBestBoard = boardType === 'community' || boardType === 2291;
  const queryClient = useQueryClient();
  const bookmarkQueryData: any = queryClient.getQueriesData('bookmarks')[0][1];

  const setOpenSidebar = useSetRecoilState(openSideBarState);

  const bookmarkData =
    bookmarkQueryData &&
    bookmarkQueryData.find((bookmark: BookmarksItemType) => Number(bookmark.id) === menuId);
  const bookmarked = bookmarkData ? bookmarkData.isBookmarked : false;

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
          marginTop: 20,
          '@media (max-width: 768px)': { display: 'none' },
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
