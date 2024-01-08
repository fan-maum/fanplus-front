import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { ReactNode } from 'react';
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useQuery } from 'react-query';
import { UrlLangType } from '@/types/common';
import { getBookmarks } from '@/api/Community';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardType?: string | string[];
  urlLang: UrlLangType;
  userId: string;
  rightItem?: ReactNode;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardType,
  rightItem,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  urlLang,
  userId,
  rightItem,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  const boardIndex = router.query.boardIndex;
  const { data } = useQuery(['bookmarks', { userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
  );
  const bookmarks = data ?? [];
  const isBookmarked = Boolean(bookmarks.find((bookmark) => bookmark.BOARD_IDX === boardIndex));

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
          paddingRight: '10px',
          height: 40,
          marginTop: 20,
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          {!boardType && (
            <IconArrowLeft
              iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
              onClickBack={() => router.back()}
            />
          )}
          <h2
            css={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.gray[1000],
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
        {rightItem}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
