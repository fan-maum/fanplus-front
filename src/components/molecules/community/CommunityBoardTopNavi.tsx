import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { BoardLangType } from '@/types/common';
import { getBookmarks } from '@/api/Community';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { BookmarksItemType } from '@/types/community';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { getCookie } from '@/utils/Cookie';
import CommunityBoardLangSelector from './CommunityBoardLangSelector';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardLang: BoardLangType;
  setLangModal: Dispatch<SetStateAction<boolean>>;
  boardType?: string | string[];
  onClickWrite: () => void;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardLang,
  boardType,
  setLangModal,
  onClickWrite,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  const userId = getCookie('user_id');
  const urlLang = useUrlLanguage();
  const boardIndex = router.query.boardIndex;
  const texts = communityBoardTexts[urlLang];
  const { data } = useQuery(['bookmarks', { userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
  );
  const bookmarks = data ?? [];
  const isBestBoard = Number(router.query.boardIndex) === 2291;
  const isBookmarked = Boolean(
    bookmarks.find((bookmark: BookmarksItemType) => bookmark.BOARD_IDX === boardIndex)
  );

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const handleBookmarkOnClick = async (boardIndex: string) => {
    if (isBookmarked) {
      useRemoveBookmark.mutate({ identity: userId, boardIndex });
    } else {
      useAddBookmark.mutate({ identity: userId, boardIndex });
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
          '@media (max-width: 768px)': { padding: '0 16px', height: 'auto' },
        }}
      >
        <div
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            '@media (max-width: 768px)': { maxWidth: '48%' },
          }}
        >
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
            isBookmarked={isBookmarked}
            width="24"
            height="24"
            onClick={() => handleBookmarkOnClick(String(boardIndex))}
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
          {!boardType && !isBestBoard && (
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
